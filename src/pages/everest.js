import * as React from "react"
import { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import s, { createGlobalStyle, css } from 'styled-components'
import Layout from "../components/layout"
import Seo from "../components/seo"
import TeamData from '../json/everest-team.json'
import ProjectsData from '../json/everest-projects.json'
import EventsData from '../json/everest-events.json'
import PubsData from '../json/pubs.json'

// Import Everest images
import LogoCircular from '../images/everest/logo_circular.png'
import LogoMain from '../images/everest/logo.png'
import ArpahLogo from '../images/everest/sponsors/arpah.svg'
import AirforceLogo from '../images/everest/sponsors/airforce.png'
import GoogleLogo from '../images/everest/sponsors/google.png'
import AmazonLogo from '../images/everest/sponsors/amazon.png'
import IntelLogo from '../images/everest/sponsors/intel.png'
import AccentureLogo from '../images/everest/sponsors/accenture.png'
import TwoSigmaLogo from '../images/everest/sponsors/twosigma.png'
import IntersystemsLogo from '../images/everest/sponsors/intersystems.png'
import TwgLogo from '../images/everest/sponsors/twg.png'

// Links to other DSG pages are absolute because everest.csail.mit.edu does not serve them
const DSG_URL = 'https://dsg.csail.mit.edu'

const NAV_SECTIONS = [
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'People' },
  { id: 'events', label: 'Events' },
  { id: 'publications', label: 'Publications' },
  { id: 'sponsors', label: 'Sponsors' },
]

// Each key in everest-team.json must appear here
const TEAM_GROUPS = [
  { key: 'faculty', heading: 'Faculty' },
  { key: 'affiliate_faculty', heading: 'Affiliate Faculty' },
  { key: 'postdocs', heading: 'Postdocs', role: 'Postdoctoral Researcher' },
  { key: 'research_engineers', heading: 'Research Engineers', role: 'Research Engineer' },
  { key: 'students', heading: 'Students', role: 'PhD Student' },
  { key: 'alumni', heading: 'Alumni' },
]

// Fail the build on team data mistakes instead of rendering a broken page
Object.keys(TeamData).forEach((key) => {
  if (!TEAM_GROUPS.some((group) => group.key === key)) {
    throw new Error(`everest-team.json: unknown group "${key}". Add it to TEAM_GROUPS in src/pages/everest.js.`)
  }
})

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Event dates are YYYY-MM-DD strings, compared against today's date in Boston
const toBostonDate = (date) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(date)

/* ============================================
   Publications
   pubs.json comes from DBLP and is refreshed by `npm run deploy`.
   The Everest list shows papers from the two most recent years with at least one
   Everest postdoc, research engineer, student, or alumnus as an author.
   ============================================ */

const PUB_AUTHOR_GROUPS = ['postdocs', 'research_engineers', 'students', 'alumni']
const RECENT_PUBS_SHOWN = 8

// DBLP sometimes spells names differently; team entries list those spellings in dblpNames
const memberNames = (members) => new Set(
  members.flatMap((member) => [member.name, ...(member.dblpNames || [])])
)
const everestAuthors = memberNames(PUB_AUTHOR_GROUPS.flatMap((group) => TeamData[group] || []))
const everestMembers = memberNames(Object.values(TeamData).flat())

const splitAuthors = (authors) => authors.split(',').map((name) => name.trim())

const titleWords = (title) => new Set(
  title.toLowerCase()
    .replace(/\b(full|extended) version\b|\btechnical report\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
)

const similarTitles = (a, b) => {
  const wordsA = titleWords(a)
  const wordsB = titleWords(b)
  const shared = [...wordsA].filter((word) => wordsB.has(word)).length
  return shared / (wordsA.size + wordsB.size - shared) >= 0.6
}

const getEverestPublications = () => {
  const candidates = PubsData.filter((pub) =>
    pub.type !== 'Editorship' && splitAuthors(pub.authors).some((name) => everestAuthors.has(name))
  )
  const published = candidates.filter((pub) => pub.venue !== 'CoRR')
  // Drop arXiv preprints of papers that also appear at a venue
  const deduplicated = candidates.filter((pub) =>
    pub.venue !== 'CoRR' || !published.some((other) =>
      splitAuthors(other.authors)[0] === splitAuthors(pub.authors)[0] && similarTitles(other.title, pub.title)
    )
  )
  if (deduplicated.length === 0) return []
  const newestYear = Math.max(...deduplicated.map((pub) => Number(pub.year)))
  return deduplicated
    .filter((pub) => Number(pub.year) >= newestYear - 1)
    .sort((a, b) => Number(b.year) - Number(a.year))
}

const EVEREST_PUBLICATIONS = getEverestPublications()

const formatVenue = (venue) => {
  const name = Array.isArray(venue) ? venue.join(' / ') : venue
  return name === 'CoRR' ? 'arXiv' : name
}

// Global styles to reset body/html margins for Everest page
const GlobalStyle = createGlobalStyle`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Override any Bootstrap or other global styles */
  main {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Target Layout wrapper div */
  body > div,
  body > div > div {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Apply Avenir Next font to Everest page */
  body,
  h1, h2, h3, h4, h5, h6,
  p, span, a, button, li, summary {
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`

// MIT Red color scheme
const COLOR_PRIMARY = '#A31F34'
const COLOR_PRIMARY_DARK = '#8B1A2D'
const COLOR_GRAY_100 = '#F5F5F5'
const COLOR_GRAY_300 = '#D1D1D1'
const COLOR_GRAY_500 = '#767676'
const COLOR_BORDER = '#D1D1D1'
const COLOR_TEXT = '#1A1A1A'
const COLOR_TEXT_SECONDARY = '#3A3A3A'
const COLOR_WHITE = '#FFFFFF'

const HEADER_HEIGHT = '70px'
// The full desktop navigation needs about 1000px; narrower screens use the menu button
const NAV_BREAKPOINT = '1024px'

// Show a focus outline for keyboard users only
const focusRing = css`
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid ${COLOR_PRIMARY};
    outline-offset: 2px;
  }
`

/* ============================================
   Styled Components - Navigation
   ============================================ */

const EverestHeader = s.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${COLOR_WHITE};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 999;
  transition: box-shadow 0.3s ease;
`

const HeaderContainer = s.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
`

const HeaderBranding = s.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 2rem;
`

const LogoLink = s.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: ${COLOR_TEXT};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  ${focusRing}
`

const HeaderLogoImg = s.img`
  width: 50px;
  height: auto;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
  filter: brightness(1.03);
`

const LogoText = s.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLOR_PRIMARY};
  line-height: 1;
  white-space: nowrap;
  letter-spacing: 0.1em;
`

const MainNav = s.nav`
  display: none;
  align-items: center;

  @media (min-width: ${NAV_BREAKPOINT}) {
    display: flex;
  }
`

const NavList = s.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 1280px) {
    gap: 0.5rem;
  }
`

const NavItem = s.li`
  margin: 0;
`

const NavLink = s.a`
  display: block;
  padding: 0.5rem 0.75rem;

  @media (min-width: 1280px) {
    padding: 0.5rem 1rem;
  }

  color: ${COLOR_TEXT};
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${COLOR_PRIMARY};
    background-color: ${COLOR_GRAY_100};
    text-decoration: none;
  }

  &[aria-current='true'] {
    color: ${COLOR_PRIMARY};
    font-weight: 600;
  }

  ${focusRing}
`

const MobileMenuToggle = s.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;

  @media (min-width: ${NAV_BREAKPOINT}) {
    display: none;
  }

  ${focusRing}
`

const HamburgerLine = s.span`
  display: block;
  width: 100%;
  height: 3px;
  background-color: ${COLOR_TEXT};
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;

  ${({ $isOpen }) => $isOpen && `
    &:nth-child(1) {
      transform: translateY(10.5px) rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    &:nth-child(3) {
      transform: translateY(-10.5px) rotate(-45deg);
    }
  `}
`

const MobileMenu = s.div`
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLOR_WHITE};
  z-index: 998;
  overflow-y: auto;
  transform: translateX(${({ $isOpen }) => $isOpen ? '0' : '100%'});
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: transform 0.3s ease, visibility 0.3s ease;
  display: block;

  @media (min-width: ${NAV_BREAKPOINT}) {
    display: none;
  }
`

const MobileNav = s.nav`
  padding: 2rem 1.5rem;
`

const MobileNavList = s.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const MobileNavLink = s.a`
  display: block;
  padding: 1rem 1.5rem;
  color: ${COLOR_TEXT};
  text-decoration: none;
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    color: ${COLOR_PRIMARY};
    background-color: ${COLOR_GRAY_100};
    border-color: ${COLOR_GRAY_300};
    text-decoration: none;
  }

  ${focusRing}
`

/* ============================================
   Styled Components - Content Sections
   ============================================ */

const MainContent = s.main`
  padding-top: ${HEADER_HEIGHT};
`

const HeroSection = s.section`
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 1.5rem 2rem;
  background-color: ${COLOR_WHITE};
  text-align: center;
  scroll-margin-top: ${HEADER_HEIGHT};
`

const HeroContent = s.div`
  max-width: 900px;
  margin: 0 auto;
`

const HeroTitle = s.h1`
  font-size: 3rem;
  font-weight: 600;
  color: ${COLOR_PRIMARY};
  margin-bottom: 1rem;
  line-height: 1;
`

const HeroLogo = s.img`
  width: 100%;
  max-width: 440px;
  height: auto;
  margin: 0 auto 0.5rem;
  display: block;
  /* The logo file has an off-white (250-254) background; this lifts it to the page's white */
  filter: brightness(1.03);

  @media (max-width: 640px) {
    max-width: 300px;
  }
`

const HeroAffiliation = s.p`
  font-size: 2rem;
  font-weight: 500;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 2rem;
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`

const HeroVision = s.p`
  font-size: 1.25rem;
  line-height: 1.65;
  color: ${COLOR_TEXT};
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`

const Section = s.section`
  padding: 5rem 1.5rem;
  background-color: ${({ $gray }) => $gray ? COLOR_GRAY_100 : COLOR_WHITE};
  scroll-margin-top: ${HEADER_HEIGHT};

  @media (max-width: 640px) {
    padding: 3.5rem 0.5rem;
  }
`

const Container = s.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const SectionHeading = s.h2`
  font-size: 3rem;
  font-weight: 700;
  color: ${COLOR_TEXT};
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
`

const SectionIntro = s.p`
  text-align: center;
  max-width: 800px;
  margin: -1.5rem auto 3rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${COLOR_TEXT_SECONDARY};

  a {
    color: ${COLOR_PRIMARY};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: ${COLOR_PRIMARY_DARK};
      text-decoration: underline;
    }
  }
`

/* Research Directions */
const ResearchDirection = s.article`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-left: 3px solid ${COLOR_PRIMARY};
  background-color: ${COLOR_GRAY_100};
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
    margin-bottom: 3rem;
    gap: 1.5rem;
  }
`

const DirectionIcon = s.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  color: ${COLOR_PRIMARY};
  background-color: ${COLOR_WHITE};
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    width: 56px;
    height: 56px;
    padding: 0.75rem;
  }
`

const DirectionContent = s.div`
  flex: 1;
`

const DirectionTitle = s.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin: 0 0 0.75rem 0;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`

const DirectionDescription = s.p`
  font-size: 1rem;
  line-height: 1.65;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

/* Projects Grid */
const ProjectsGrid = s.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
`

const projectCard = css`
  background-color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_BORDER};
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`

const ProjectLinkCard = s.a`
  ${projectCard}
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    border-color: ${COLOR_PRIMARY};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    text-decoration: none;
  }

  ${focusRing}
`

const ProjectCard = s.article`
  ${projectCard}
`

const ProjectTitle = s.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  line-height: 1.2;
  margin: 0 0 1rem 0;
  transition: color 0.2s ease, text-decoration 0.2s ease;
  text-decoration: none;

  ${ProjectLinkCard}:hover & {
    color: ${COLOR_PRIMARY};
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const ProjectDescription = s.p`
  font-size: 1rem;
  line-height: 1.65;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 0;
  flex-grow: 1;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const ProjectHost = s.span`
  margin-top: 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLOR_PRIMARY};
`

/* Team Section */
const TeamCategory = s.div`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const TeamCategoryHeading = s.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${COLOR_BORDER};
  line-height: 1.2;
`

const TeamGrid = s.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 0 auto;

  @media (min-width: 340px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1280px) {
    gap: 2.5rem;
  }
`

const TeamMember = s.article`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TeamMemberPhoto = s.div`
  width: 140px;
  height: 140px;
  margin: 0 auto 1rem;
  flex-shrink: 0;

  @media (max-width: 639px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 1024px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 1280px) {
    width: 140px;
    height: 140px;
  }
`

const PhotoPlaceholder = s.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${COLOR_GRAY_100};
  border: 2px solid ${COLOR_BORDER};
  transition: border-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${TeamMember}:hover & {
    border-color: ${COLOR_PRIMARY};
  }
`

const TeamPhotoImage = s(GatsbyImage)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid ${COLOR_BORDER};
  transition: border-color 0.2s ease;
  /* Keep Safari from drawing the image outside the circle */
  isolation: isolate;
  transform: translateZ(0);

  ${TeamMember}:hover & {
    border-color: ${COLOR_PRIMARY};
  }
`

const TeamMemberName = s.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 0.25rem;
  line-height: 1.2;
`

const TeamMemberLink = s.a`
  color: ${COLOR_TEXT};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLOR_PRIMARY};
    text-decoration: underline;
  }

  ${focusRing}
`

const TeamMemberRole = s.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 0.25rem;
  line-height: 1.5;
`

/* Events Section */
const EventGroupHeading = s.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 0 0 1.25rem 0;
`

const EventsList = s.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const EventItemLink = s.a`
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  ${focusRing}
`

const EventItem = s.article`
  background-color: ${COLOR_WHITE};
  border: 2px solid ${COLOR_BORDER};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${EventItemLink}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.upcoming {
    border-color: ${COLOR_PRIMARY};
    border-width: 3px;
  }
`

const EventHeader = s.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const EventDate = s.time`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ $past }) => $past ? COLOR_GRAY_500 : COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 0.75rem;
  border-radius: 8px;
  min-width: 80px;
  text-align: center;

  @media (max-width: 639px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 0.75rem;
  }
`

const EventMonth = s.span`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const EventDay = s.span`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin: 0.25rem 0;

  @media (max-width: 639px) {
    font-size: 1.5rem;
    margin: 0;
  }
`

const EventYear = s.span`
  font-size: 0.875rem;
  font-weight: 500;
`

const EventDetails = s.div`
  flex: 1;
`

const EventTitle = s.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: text-decoration 0.2s ease;

  ${EventItemLink}:hover & {
    text-decoration: underline;
  }
`

const EventLocation = s.p`
  color: ${COLOR_TEXT_SECONDARY};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0;
`

const EventContent = s.div`
  margin-top: 1rem;
`

const EventDescription = s.p`
  color: ${COLOR_TEXT};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const EventMeta = s.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid ${COLOR_BORDER};
  font-size: 0.875rem;
  color: ${COLOR_TEXT_SECONDARY};
  font-weight: 500;
`

const EventLinkText = s.span`
  color: ${COLOR_PRIMARY};
  font-weight: 600;
`

/* Publications Section */
const PublicationList = s.ol`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 960px;
  text-align: left;
`

const PublicationItem = s.li`
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${COLOR_GRAY_300};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

const PublicationTitle = s.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;

  a {
    color: ${COLOR_TEXT};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${COLOR_PRIMARY};
      text-decoration: underline;
    }

    ${focusRing}
  }

  @media (min-width: 768px) {
    font-size: 1.375rem;
  }
`

const PublicationAuthors = s.p`
  font-size: 0.9375rem;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 0.25rem;
  line-height: 1.5;

  strong {
    color: ${COLOR_TEXT};
    font-weight: 600;
  }
`

const PublicationVenue = s.p`
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.875rem;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 0;
  line-height: 1.5;
`

const MorePublications = s.details`
  margin-top: 2rem;
  text-align: center;

  &[open] > summary {
    margin-bottom: 2rem;
  }

  .label-open,
  &[open] .label-closed {
    display: none;
  }

  &[open] .label-open {
    display: inline;
  }
`

const MorePublicationsToggle = s.summary`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${COLOR_WHITE};
  background-color: ${COLOR_PRIMARY};
  border: 2px solid ${COLOR_PRIMARY};
  border-radius: 4px;
  transition: all 0.2s ease;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    background-color: ${COLOR_PRIMARY_DARK};
    border-color: ${COLOR_PRIMARY_DARK};
    box-shadow: 0 4px 8px rgba(163, 31, 52, 0.2);
  }

  ${focusRing}
`

const PublicationsFooter = s.p`
  text-align: center;
  margin: 2.5rem 0 0;
  font-size: 1rem;
  color: ${COLOR_TEXT_SECONDARY};

  a {
    color: ${COLOR_PRIMARY};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: ${COLOR_PRIMARY_DARK};
      text-decoration: underline;
    }
  }
`

/* Sponsors Section */
const SponsorsGrid = s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  align-items: center;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const SponsorItem = s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const SponsorLogo = s.img`
  max-width: 180px;
  max-height: 70px;
  width: auto;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 150px;
    max-height: 60px;
  }

  @media (max-width: 640px) {
    max-width: 130px;
    max-height: 50px;
  }
`

const SponsorContact = s.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${COLOR_BORDER};

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${COLOR_TEXT_SECONDARY};
    margin-bottom: 1rem;
  }

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${COLOR_PRIMARY_DARK};
      text-decoration: underline;
    }
  }
`

/* Contact Section */
const ContactContent = s.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ContactInfo = s.div`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${COLOR_BORDER};

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 768px) {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const ContactSubheading = s.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 0.75rem;
  line-height: 1.2;
`

const ContactText = s.p`
  font-size: 1rem;
  line-height: 1.65;
  color: ${COLOR_TEXT};
  margin: 0 0 0.5rem 0;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: ${COLOR_PRIMARY_DARK};
      text-decoration: underline;
    }
  }
`

/* ============================================
   Helper Components
   ============================================ */

const PersonPlaceholder = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="100" fill={COLOR_GRAY_300} />
    <circle cx="100" cy="80" r="35" fill={COLOR_GRAY_500} />
    <path d="M40 160 Q40 120 100 120 Q160 120 160 160 L160 200 L40 200 Z" fill={COLOR_GRAY_500} />
  </svg>
)

const TeamMemberCard = ({ member, photo, defaultRole }) => {
  const role = member.role || defaultRole
  const hasLink = Boolean(member.url) && member.url !== '#'

  return (
    <TeamMember>
      <TeamMemberPhoto>
        {photo ? (
          <TeamPhotoImage image={photo} alt="" />
        ) : (
          <PhotoPlaceholder>
            <PersonPlaceholder />
          </PhotoPlaceholder>
        )}
      </TeamMemberPhoto>
      <TeamMemberName>
        {hasLink ? (
          <TeamMemberLink href={member.url} target="_blank" rel="noopener noreferrer">
            {member.name}
          </TeamMemberLink>
        ) : member.name}
      </TeamMemberName>
      {role && <TeamMemberRole>{role}</TeamMemberRole>}
    </TeamMember>
  )
}

const ProjectEntry = ({ project }) => {
  const content = (
    <>
      <ProjectTitle>{project.name}</ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
    </>
  )

  if (!project.url) {
    return <ProjectCard>{content}</ProjectCard>
  }

  return (
    <ProjectLinkCard href={project.url} target="_blank" rel="noopener noreferrer">
      {content}
      <ProjectHost>{new URL(project.url, DSG_URL).hostname.replace(/^www\./, '')} ↗</ProjectHost>
    </ProjectLinkCard>
  )
}

const EventEntry = ({ event, upcoming }) => {
  const [year, month, day] = event.date.split('-')
  const card = (
    <EventItem className={upcoming ? 'upcoming' : undefined}>
      <EventHeader>
        <EventDate dateTime={event.date} $past={!upcoming}>
          <EventMonth>{MONTHS[Number(month) - 1]}</EventMonth>
          <EventDay>{Number(day)}</EventDay>
          <EventYear>{year}</EventYear>
        </EventDate>
        <EventDetails>
          <EventTitle>{event.title}</EventTitle>
          <EventLocation>{event.location}</EventLocation>
        </EventDetails>
      </EventHeader>
      <EventContent>
        <EventDescription>{event.description}</EventDescription>
        <EventMeta>
          {event.time && <span>{event.time}</span>}
          {event.format && <span>{event.format}</span>}
          {event.url && <EventLinkText>{event.linkText || 'Details'} →</EventLinkText>}
        </EventMeta>
      </EventContent>
    </EventItem>
  )

  return event.url ? <EventItemLink href={event.url}>{card}</EventItemLink> : card
}

const PublicationEntry = ({ pub }) => {
  const link = (Array.isArray(pub.ee) ? pub.ee[0] : pub.ee) || pub.url
  const authors = splitAuthors(pub.authors)

  return (
    <PublicationItem>
      <PublicationTitle>
        <a href={link} target="_blank" rel="noopener noreferrer">{pub.title.replace(/\.$/, '')}</a>
      </PublicationTitle>
      <PublicationAuthors>
        {authors.map((name, index) => (
          <React.Fragment key={`${name}-${index}`}>
            {index > 0 && ', '}
            {everestMembers.has(name) ? <strong>{name}</strong> : name}
          </React.Fragment>
        ))}
      </PublicationAuthors>
      <PublicationVenue>{formatVenue(pub.venue)} {pub.year}</PublicationVenue>
    </PublicationItem>
  )
}

/* ============================================
   Main Component
   ============================================ */

const EverestPage = () => {
  const { site, peoplePhotos } = useStaticQuery(graphql`
    query EverestPageData {
      site {
        buildTime
      }
      peoplePhotos: allFile(filter: { sourceInstanceName: { eq: "images" }, relativeDirectory: { eq: "people" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(width: 280, height: 280, layout: CONSTRAINED, sizes: "140px", placeholder: BLURRED, transformOptions: { cropFocus: CENTER })
          }
        }
      }
    }
  `)
  // Photos are resized at build time, so large source files do not slow the page
  const photosByFile = new Map(peoplePhotos.nodes.map((node) => [node.base, getImage(node.childImageSharp)]))
  const getTeamPhoto = (member) => {
    if (!member.photo) return null
    const photo = photosByFile.get(member.photo)
    if (!photo) {
      throw new Error(`everest-team.json: photo "${member.photo}" for ${member.name} is not an image in src/images/people.`)
    }
    return photo
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  // Start from the build date so the server HTML and first render match, then use today's date
  const [today, setToday] = useState(() => toBostonDate(new Date(site.buildTime)))

  useEffect(() => {
    setToday(toBostonDate(new Date()))
  }, [])

  const eventsByDate = [...EventsData].sort((a, b) => b.date.localeCompare(a.date))
  const upcomingEvents = eventsByDate.filter((event) => event.date >= today).reverse()
  const pastEvents = eventsByDate.filter((event) => event.date < today)
  const recentPublications = EVEREST_PUBLICATIONS.slice(0, RECENT_PUBS_SHOWN)
  const olderPublications = EVEREST_PUBLICATIONS.slice(RECENT_PUBS_SHOWN)

  // Scroll to a section without a page jump; the links still work as plain anchors without JavaScript
  const handleNavClick = (event, sectionId) => {
    const target = document.getElementById(sectionId)
    if (!target) return
    event.preventDefault()
    setMobileMenuOpen(false)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }

  // Highlight the navigation item for the section in view
  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { rootMargin: `-${HEADER_HEIGHT} 0px -60% 0px` })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <Layout everest>
      <GlobalStyle />
      {/* Custom Everest Header */}
      <EverestHeader>
        <HeaderContainer>
          <HeaderBranding>
            <LogoLink href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
              <LogoText>EVEREST</LogoText>
              <HeaderLogoImg src={LogoCircular} alt="" width={511} height={373} />
            </LogoLink>
          </HeaderBranding>

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="everest-mobile-menu"
          >
            <HamburgerLine $isOpen={mobileMenuOpen} />
            <HamburgerLine $isOpen={mobileMenuOpen} />
            <HamburgerLine $isOpen={mobileMenuOpen} />
          </MobileMenuToggle>

          {/* Desktop Navigation */}
          <MainNav aria-label="Everest sections">
            <NavList>
              {NAV_SECTIONS.map(({ id, label }) => (
                <NavItem key={id}>
                  <NavLink href={`#${id}`} onClick={(e) => handleNavClick(e, id)} aria-current={activeSection === id ? 'true' : undefined}>
                    {label}
                  </NavLink>
                </NavItem>
              ))}
              <NavItem><NavLink href={DSG_URL} target="_blank" rel="noopener noreferrer">DSG ↗</NavLink></NavItem>
            </NavList>
          </MainNav>
        </HeaderContainer>

        {/* Mobile Menu Overlay */}
        <MobileMenu id="everest-mobile-menu" $isOpen={mobileMenuOpen}>
          <MobileNav aria-label="Everest sections">
            <MobileNavList>
              {NAV_SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <MobileNavLink href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>{label}</MobileNavLink>
                </li>
              ))}
              <li><MobileNavLink href={DSG_URL} target="_blank" rel="noopener noreferrer">DSG ↗</MobileNavLink></li>
            </MobileNavList>
          </MobileNav>
        </MobileMenu>
      </EverestHeader>

      <MainContent>
        {/* Hero Section */}
        <HeroSection id="hero">
          <HeroContent>
            <HeroTitle>EVEREST</HeroTitle>
            <HeroLogo src={LogoMain} alt="Everest Lab logo" width={511} height={373} />
            <HeroAffiliation>Data Systems Group · MIT&nbsp;CSAIL</HeroAffiliation>
            <HeroVision>
              Our mission is to establish the engineering principles for AI-driven data systems. We move beyond ad-hoc experimentation to build a foundation of new abstractions, reusable software components, and rigorous development tools.
            </HeroVision>
          </HeroContent>
        </HeroSection>

        {/* Research Directions Section */}
        <Section id="research">
          <Container>
            <SectionHeading>Research Directions</SectionHeading>

            <ResearchDirection>
              <DirectionIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </DirectionIcon>
              <DirectionContent>
                <DirectionTitle>Code Generation</DirectionTitle>
                <DirectionDescription>
                  Developing AI systems that automatically generate code from specifications, design documents, and natural language descriptions, advancing program synthesis and software development automation.
                </DirectionDescription>
              </DirectionContent>
            </ResearchDirection>

            <ResearchDirection>
              <DirectionIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </DirectionIcon>
              <DirectionContent>
                <DirectionTitle>Data Analytics</DirectionTitle>
                <DirectionDescription>
                  Building AI-powered systems for data analysis, transformation, and insight extraction, applying optimization techniques to make data processing more efficient and accessible.
                </DirectionDescription>
              </DirectionContent>
            </ResearchDirection>

            <ResearchDirection>
              <DirectionIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </DirectionIcon>
              <DirectionContent>
                <DirectionTitle>Large Scale Retrieval</DirectionTitle>
                <DirectionDescription>
                  Developing efficient systems for retrieving relevant information from massive datasets, optimizing both accuracy and performance for real-world applications.
                </DirectionDescription>
              </DirectionContent>
            </ResearchDirection>

            <ResearchDirection>
              <DirectionIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </DirectionIcon>
              <DirectionContent>
                <DirectionTitle>Agent Operations</DirectionTitle>
                <DirectionDescription>
                  Investigating operational frameworks for deploying and managing AI agents in production environments, addressing challenges in monitoring, debugging, and maintaining autonomous systems.
                </DirectionDescription>
              </DirectionContent>
            </ResearchDirection>

            <ResearchDirection>
              <DirectionIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </DirectionIcon>
              <DirectionContent>
                <DirectionTitle>Agent Planning</DirectionTitle>
                <DirectionDescription>
                  Developing methods for AI agents to autonomously plan and execute complex multi-step tasks, combining reasoning, decision-making, and adaptive execution strategies.
                </DirectionDescription>
              </DirectionContent>
            </ResearchDirection>
          </Container>
        </Section>

        {/* Projects Section */}
        <Section id="projects" $gray>
          <Container>
            <SectionHeading>Projects</SectionHeading>

            <ProjectsGrid>
              {ProjectsData.map((project) => (
                <ProjectEntry key={project.name} project={project} />
              ))}
            </ProjectsGrid>
          </Container>
        </Section>

        {/* Team Section */}
        <Section id="team">
          <Container>
            <SectionHeading>Team</SectionHeading>

            {TEAM_GROUPS.filter(({ key }) => TeamData[key]?.length > 0).map(({ key, heading, role }) => (
              <TeamCategory key={key}>
                <TeamCategoryHeading>{heading}</TeamCategoryHeading>
                <TeamGrid>
                  {TeamData[key].map((member) => (
                    <TeamMemberCard key={member.name} member={member} photo={getTeamPhoto(member)} defaultRole={role} />
                  ))}
                </TeamGrid>
              </TeamCategory>
            ))}
          </Container>
        </Section>

        {/* Events Section */}
        <Section id="events" $gray>
          <Container>
            <SectionHeading>Events</SectionHeading>

            {upcomingEvents.length > 0 && (
              <EventsList>
                <EventGroupHeading>Upcoming</EventGroupHeading>
                {upcomingEvents.map((event) => (
                  <EventEntry key={event.title} event={event} upcoming />
                ))}
              </EventsList>
            )}

            {pastEvents.length > 0 && (
              <EventsList>
                <EventGroupHeading>Past events</EventGroupHeading>
                {pastEvents.map((event) => (
                  <EventEntry key={event.title} event={event} />
                ))}
              </EventsList>
            )}
          </Container>
        </Section>

        {/* Publications Section */}
        <Section id="publications">
          <Container>
            <SectionHeading>Publications</SectionHeading>

            <SectionIntro>
              Recent papers by Everest members, drawn from DBLP. Current and former members are shown in bold.
            </SectionIntro>

            <PublicationList>
              {recentPublications.map((pub) => (
                <PublicationEntry key={pub.key} pub={pub} />
              ))}
            </PublicationList>

            {olderPublications.length > 0 && (
              <MorePublications>
                <MorePublicationsToggle>
                  <span className="label-closed">Show {olderPublications.length} more</span>
                  <span className="label-open">Show fewer</span>
                </MorePublicationsToggle>
                <PublicationList>
                  {olderPublications.map((pub) => (
                    <PublicationEntry key={pub.key} pub={pub} />
                  ))}
                </PublicationList>
              </MorePublications>
            )}

            <PublicationsFooter>
              For all publications from the Data Systems Group, see the <a href={`${DSG_URL}/publications/`}>DSG publications page</a>.
            </PublicationsFooter>
          </Container>
        </Section>

        {/* Sponsors Section */}
        <Section id="sponsors" $gray>
          <Container>
            <SectionHeading>Sponsors</SectionHeading>

            <SectionIntro>
              Our research is made possible through the generous support of industry partners and funding agencies who share our vision for advancing AI-driven data systems.
            </SectionIntro>

            <SponsorsGrid>
              <SponsorItem>
                <SponsorLogo src={ArpahLogo} alt="ARPA-H Advanced Research Projects Agency for Health" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={AirforceLogo} alt="United States Air Force" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={GoogleLogo} alt="Google" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={AmazonLogo} alt="Amazon" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={IntelLogo} alt="Intel" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={AccentureLogo} alt="Accenture" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={TwoSigmaLogo} alt="Two Sigma" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={IntersystemsLogo} alt="InterSystems" />
              </SponsorItem>
              <SponsorItem>
                <SponsorLogo src={TwgLogo} alt="TWG Global" />
              </SponsorItem>
            </SponsorsGrid>

            <SponsorContact>
              <p>For sponsorship opportunities, please contact us at <a href="mailto:everest-info@csail.mit.edu">everest-info@csail.mit.edu</a></p>
            </SponsorContact>
          </Container>
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <Container>
            <SectionHeading>Contact</SectionHeading>

            <ContactContent>
              <ContactInfo>
                <ContactSubheading>Lab Contact</ContactSubheading>
                <ContactText>
                  <a href="mailto:everest-info@csail.mit.edu">everest-info@csail.mit.edu</a>
                </ContactText>
              </ContactInfo>

              <ContactInfo>
                <ContactSubheading>Location</ContactSubheading>
                <ContactText>MIT Computer Science & Artificial Intelligence Laboratory</ContactText>
                <ContactText>32 Vassar Street</ContactText>
                <ContactText>Cambridge, MA 02139</ContactText>
              </ContactInfo>

              <ContactInfo>
                <ContactSubheading>Prospective Students</ContactSubheading>
                <ContactText>
                  We welcome inquiries from prospective PhD students interested in AI-powered data systems. Please reach out to faculty members directly regarding research opportunities.
                </ContactText>
              </ContactInfo>
            </ContactContent>
          </Container>
        </Section>
      </MainContent>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Everest Lab | MIT CSAIL"
    description="Everest, part of the Data Systems Group at MIT CSAIL, establishes engineering principles for AI-driven data systems: new abstractions, reusable software components, and rigorous development tools."
    ogTitle="Everest Lab @ MIT CSAIL"
    ogImage={`${DSG_URL}/images/everest-social.png`}
  >
    <link rel="canonical" href={`${DSG_URL}/everest/`} />
  </Seo>
)

export default EverestPage
