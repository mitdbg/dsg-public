import * as React from "react"
import { useState, useEffect, useRef } from "react"
import s, { createGlobalStyle } from 'styled-components'
import Layout from "../components/layout"
import Seo from "../components/seo"
import TeamData from '../json/everest-team.json'

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

// Import all team member photos using require.context
const importAll = (r) => {
  let images = {}
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item) })
  return images
}
const teamPhotos = importAll(require.context('../images/people', false, /\.(png|jpe?g|svg)$/))

// Helper function to get team photo
const getTeamPhoto = (filename) => {
  return teamPhotos[filename]?.default || teamPhotos[filename] || null
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
  p, span, a, button, li {
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
  }
`

// MIT Red color scheme
const COLOR_PRIMARY = '#A31F34'
const COLOR_PRIMARY_DARK = '#8B1A2D'
const COLOR_PRIMARY_LIGHT = '#C72C41'
const COLOR_GRAY_100 = '#F5F5F5'
const COLOR_GRAY_300 = '#D1D1D1'
const COLOR_GRAY_500 = '#767676'
const COLOR_BORDER = '#D1D1D1'
const COLOR_TEXT = '#1A1A1A'
const COLOR_TEXT_SECONDARY = '#3A3A3A'
const COLOR_WHITE = '#FFFFFF'

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
  height: 70px;
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
`

const HeaderLogoImg = s.img`
  width: 50px;
  height: auto;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
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

  @media (min-width: 768px) {
    display: flex;
  }
`

const NavList = s.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavItem = s.li`
  margin: 0;
`

const NavLink = s.a`
  display: block;
  padding: 0.5rem 1rem;
  color: ${COLOR_TEXT};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${COLOR_PRIMARY};
    background-color: ${COLOR_GRAY_100};
  }

  &.active {
    color: ${COLOR_PRIMARY};
    font-weight: 600;
  }
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

  @media (min-width: 768px) {
    display: none;
  }
`

const HamburgerLine = s.span`
  display: block;
  width: 100%;
  height: 3px;
  background-color: ${COLOR_TEXT};
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;

  ${({ isOpen }) => isOpen && `
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
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLOR_WHITE};
  z-index: 998;
  overflow-y: auto;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  display: block;

  @media (min-width: 768px) {
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
  }
`

/* ============================================
   Styled Components - Content Sections
   ============================================ */

const MainContent = s.main`
  padding-top: 70px;
`

const HeroSection = s.section`
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 1.5rem 2rem;
  background-color: ${COLOR_WHITE};
  text-align: center;
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
  background-color: ${props => props.bgGray ? COLOR_GRAY_100 : COLOR_WHITE};
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

const Project = s.article`
  background-color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_BORDER};
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${COLOR_PRIMARY};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`

const ProjectTitle = s.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  line-height: 1.2;
  margin: 0 0 1rem -2rem;
  padding-left: 2rem;

  a {
    color: ${COLOR_TEXT};
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: inherit;
    font-weight: inherit;
    display: block;
    margin-left: -2rem;
    padding-left: 2rem;

    &:hover {
      color: ${COLOR_PRIMARY};
    }
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const ProjectDescription = s.p`
  font-size: 1rem;
  line-height: 1.65;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 0 0 1.5rem 0;
  flex-grow: 1;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const ProjectLinks = s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: auto;
`

const ProjectLink = s.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  text-decoration: underline;
  background-color: transparent;
  border: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLOR_PRIMARY_DARK};
  }
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

  @media (min-width: 640px) {
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

const TeamPhotoImg = s.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${COLOR_BORDER};
  transition: border-color 0.2s ease;

  ${TeamMember}:hover & {
    border-color: ${COLOR_PRIMARY};
  }
`

const TeamMemberName = s.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  line-height: 1.2;
`

const TeamMemberLink = s.a`
  color: ${COLOR_TEXT};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`

const TeamMemberRole = s.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 0.25rem;
  line-height: 1.5;
`

/* Events Section */
const EventsList = s.div`
  margin-top: 2rem;
`

const EventItem = s.article`
  background-color: ${COLOR_WHITE};
  border: 2px solid ${COLOR_BORDER};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
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

const EventDate = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLOR_PRIMARY};
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

const EventTitle = s.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 0.5rem;
`

const EventLocation = s.p`
  color: ${COLOR_GRAY_500};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
  color: ${COLOR_GRAY_500};
  font-weight: 500;
`

/* Publications Section */
const RecentPublications = s.div`
  margin-bottom: 2rem;
`

const PublicationItem = s.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR_GRAY_300};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

const PublicationTitle = s.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  a {
    color: ${COLOR_TEXT};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${COLOR_PRIMARY};
    }
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const PublicationAuthors = s.p`
  font-size: 0.875rem;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 0.25rem;
  line-height: 1.5;
`

const PublicationVenue = s.p`
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.875rem;
  color: ${COLOR_TEXT_SECONDARY};
  font-style: normal;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`

const AllPubsToggleContainer = s.div`
  text-align: center;
  margin: 2rem 0;
`

const AllPubsToggle = s.button`
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

  &:hover {
    background-color: ${COLOR_PRIMARY_DARK};
    border-color: ${COLOR_PRIMARY_DARK};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(163, 31, 52, 0.2);
  }
`

const AllPublications = s.div`
  margin-top: 2rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
`

/* Sponsors Section */
const SponsorsIntro = s.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${COLOR_TEXT_SECONDARY};
`

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

const SponsorItem = s.article`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
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
   Helper Component - Person Placeholder SVG
   ============================================ */

const PersonPlaceholder = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="100" fill={COLOR_GRAY_300} />
    <circle cx="100" cy="80" r="35" fill={COLOR_GRAY_500} />
    <path d="M40 160 Q40 120 100 120 Q160 120 160 160 L160 200 L40 200 Z" fill={COLOR_GRAY_500} />
  </svg>
)

/* ============================================
   Main Component
   ============================================ */

const EverestPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [allPubsOpen, setAllPubsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    closeMobileMenu()
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 140 // Account for both navbars
      const targetPosition = element.offsetTop - offset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu()
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
            <LogoLink href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
              <LogoText>EVEREST</LogoText>
              <HeaderLogoImg src={LogoCircular} alt="Everest Lab Logo" />
            </LogoLink>
          </HeaderBranding>

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle onClick={toggleMobileMenu} aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
            <HamburgerLine isOpen={mobileMenuOpen} />
            <HamburgerLine isOpen={mobileMenuOpen} />
            <HamburgerLine isOpen={mobileMenuOpen} />
          </MobileMenuToggle>

          {/* Desktop Navigation */}
          <MainNav>
            <NavList>
              <NavItem><NavLink onClick={() => scrollToSection('research')} className={activeSection === 'research' ? 'active' : ''}>RESEARCH</NavLink></NavItem>
              <NavItem><NavLink onClick={() => scrollToSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>PROJECTS</NavLink></NavItem>
              <NavItem><NavLink onClick={() => scrollToSection('team')} className={activeSection === 'team' ? 'active' : ''}>PEOPLE</NavLink></NavItem>
              <NavItem><NavLink onClick={() => scrollToSection('events')} className={activeSection === 'events' ? 'active' : ''}>EVENTS</NavLink></NavItem>
              <NavItem><NavLink onClick={() => scrollToSection('publications')} className={activeSection === 'publications' ? 'active' : ''}>PUBLICATIONS</NavLink></NavItem>
              <NavItem><NavLink onClick={() => scrollToSection('sponsors')} className={activeSection === 'sponsors' ? 'active' : ''}>SPONSORS</NavLink></NavItem>
              <NavItem><NavLink href="https://dsg.csail.mit.edu" target="_blank" rel="noopener noreferrer">DSG ↗</NavLink></NavItem>
            </NavList>
          </MainNav>
        </HeaderContainer>

        {/* Mobile Menu Overlay */}
        <MobileMenu isOpen={mobileMenuOpen}>
          <MobileNav>
            <MobileNavList>
              <li><MobileNavLink onClick={() => scrollToSection('research')}>RESEARCH</MobileNavLink></li>
              <li><MobileNavLink onClick={() => scrollToSection('projects')}>PROJECTS</MobileNavLink></li>
              <li><MobileNavLink onClick={() => scrollToSection('team')}>PEOPLE</MobileNavLink></li>
              <li><MobileNavLink onClick={() => scrollToSection('events')}>EVENTS</MobileNavLink></li>
              <li><MobileNavLink onClick={() => scrollToSection('publications')}>PUBLICATIONS</MobileNavLink></li>
              <li><MobileNavLink onClick={() => scrollToSection('sponsors')}>SPONSORS</MobileNavLink></li>
              <li><MobileNavLink href="https://dsg.csail.mit.edu" target="_blank" rel="noopener noreferrer">DSG</MobileNavLink></li>
            </MobileNavList>
          </MobileNav>
        </MobileMenu>
      </EverestHeader>

      <MainContent>
        {/* Hero Section */}
        <HeroSection id="hero">
          <HeroContent>
            <HeroTitle>EVEREST</HeroTitle>
            <HeroLogo src={LogoMain} alt="Everest Lab Logo" />
            <HeroAffiliation>Data Systems Group · MIT CSAIL</HeroAffiliation>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <Section id="projects" bgGray>
          <Container>
            <SectionHeading>Projects</SectionHeading>

            <ProjectsGrid>
              <Project>
                <ProjectTitle>
                  <ProjectLink href="#" aria-label="Learn more about D4">
                    D4: Design Doc Driven Development
                  </ProjectLink>
                </ProjectTitle>
                <ProjectDescription>
                  D4 achieves a 54.8% average pass rate on the commit-0 benchmark, outperforming the next-best system by 14 percentage points. The system is an LLM-based compiler that generates code from design documents, treating design specifications as input and automatically producing implementation code.
                </ProjectDescription>
              </Project>

              <Project>
                <ProjectTitle>
                  <ProjectLink href="#" aria-label="Learn more about Palimpzest">
                    Palimpzest
                  </ProjectLink>
                </ProjectTitle>
                <ProjectDescription>
                  Palimpzest achieves a 90.3x speedup and 9.1x cost reduction on document processing benchmarks. The system applies cost-based query optimization techniques to AI-powered data processing, automatically selecting optimal combinations of models, prompts, and execution strategies for data transformation tasks.
                </ProjectDescription>
              </Project>

              <Project>
                <ProjectTitle>
                  <ProjectLink href="#" aria-label="Learn more about A2rchi">
                    A2rchi
                  </ProjectLink>
                </ProjectTitle>
                <ProjectDescription>
                  A2rchi is an open-source RAG framework for AI support systems. The system enables retrieval-augmented generation for technical assistance and has been deployed at MIT (SubMIT system and multiple courses) and CERN for particle physics data processing support.
                </ProjectDescription>
              </Project>

              <Project>
                <ProjectTitle>
                  <ProjectLink href="#" aria-label="Learn more about BRAD">
                    BRAD
                  </ProjectLink>
                </ProjectTitle>
                <ProjectDescription>
                  BRAD (Blueprint for Relational Adaptive Databases) virtualizes cloud data infrastructures, automatically optimizing cloud database deployments across different storage engines and compute resources to balance performance and cost.
                </ProjectDescription>
              </Project>
            </ProjectsGrid>
          </Container>
        </Section>

        {/* Team Section */}
        <Section id="team">
          <Container>
            <SectionHeading>Team</SectionHeading>

            {/* Faculty */}
            <TeamCategory>
              <TeamCategoryHeading>Faculty</TeamCategoryHeading>
              <TeamGrid>
                {TeamData.faculty.map((member, index) => (
                  <TeamMember key={index}>
                    <TeamMemberPhoto>
                      {member.photo ? (
                        <TeamPhotoImg src={getTeamPhoto(member.photo)} alt={`Photo of ${member.name}`} />
                      ) : (
                        <PhotoPlaceholder>
                          <PersonPlaceholder />
                        </PhotoPlaceholder>
                      )}
                    </TeamMemberPhoto>
                    <TeamMemberName>
                      <TeamMemberLink href={member.url} target="_blank" rel="noopener noreferrer">
                        {member.name}
                      </TeamMemberLink>
                    </TeamMemberName>
                  </TeamMember>
                ))}
              </TeamGrid>
            </TeamCategory>

            {/* Affiliate Faculty */}
            <TeamCategory>
              <TeamCategoryHeading>Affiliate Faculty</TeamCategoryHeading>
              <TeamGrid>
                {TeamData.affiliate_faculty.map((member, index) => (
                  <TeamMember key={index}>
                    <TeamMemberPhoto>
                      {member.photo ? (
                        <TeamPhotoImg src={getTeamPhoto(member.photo)} alt={`Photo of ${member.name}`} />
                      ) : (
                        <PhotoPlaceholder>
                          <PersonPlaceholder />
                        </PhotoPlaceholder>
                      )}
                    </TeamMemberPhoto>
                    <TeamMemberName>
                      <TeamMemberLink href={member.url} target="_blank" rel="noopener noreferrer">
                        {member.name}
                      </TeamMemberLink>
                    </TeamMemberName>
                  </TeamMember>
                ))}
              </TeamGrid>
            </TeamCategory>

            {/* Postdocs */}
            <TeamCategory>
              <TeamCategoryHeading>Postdocs</TeamCategoryHeading>
              <TeamGrid>
                {TeamData.postdocs.map((member, index) => (
                  <TeamMember key={index}>
                    <TeamMemberPhoto>
                      {member.photo ? (
                        <TeamPhotoImg src={getTeamPhoto(member.photo)} alt={`Photo of ${member.name}`} />
                      ) : (
                        <PhotoPlaceholder>
                          <PersonPlaceholder />
                        </PhotoPlaceholder>
                      )}
                    </TeamMemberPhoto>
                    <TeamMemberName>
                      <TeamMemberLink href={member.url} target="_blank" rel="noopener noreferrer">
                        {member.name}
                      </TeamMemberLink>
                    </TeamMemberName>
                    <TeamMemberRole>Postdoctoral Researcher</TeamMemberRole>
                  </TeamMember>
                ))}
              </TeamGrid>
            </TeamCategory>

            {/* Research Engineers */}
            <TeamCategory>
              <TeamCategoryHeading>Research Engineers</TeamCategoryHeading>
              <TeamGrid>
                {TeamData.research_engineers.map((member, index) => (
                  <TeamMember key={index}>
                    <TeamMemberPhoto>
                      {member.photo ? (
                        <TeamPhotoImg src={getTeamPhoto(member.photo)} alt={`Photo of ${member.name}`} />
                      ) : (
                        <PhotoPlaceholder>
                          <PersonPlaceholder />
                        </PhotoPlaceholder>
                      )}
                    </TeamMemberPhoto>
                    <TeamMemberName>
                      <TeamMemberLink href={member.url} target="_blank" rel="noopener noreferrer">
                        {member.name}
                      </TeamMemberLink>
                    </TeamMemberName>
                    <TeamMemberRole>Research Engineer</TeamMemberRole>
                  </TeamMember>
                ))}
              </TeamGrid>
            </TeamCategory>

            {/* Students */}
            <TeamCategory>
              <TeamCategoryHeading>Students</TeamCategoryHeading>
              <TeamGrid>
                {TeamData.students.map((member, index) => (
                  <TeamMember key={index}>
                    <TeamMemberPhoto>
                      {member.photo ? (
                        <TeamPhotoImg src={getTeamPhoto(member.photo)} alt={`Photo of ${member.name}`} />
                      ) : (
                        <PhotoPlaceholder>
                          <PersonPlaceholder />
                        </PhotoPlaceholder>
                      )}
                    </TeamMemberPhoto>
                    <TeamMemberName>
                      <TeamMemberLink href={member.url} target="_blank" rel="noopener noreferrer">
                        {member.name}
                      </TeamMemberLink>
                    </TeamMemberName>
                    <TeamMemberRole>PhD Student</TeamMemberRole>
                  </TeamMember>
                ))}
              </TeamGrid>
            </TeamCategory>
          </Container>
        </Section>

        {/* Events Section */}
        <Section id="events" bgGray>
          <Container>
            <SectionHeading>Events</SectionHeading>

            <EventsList>
              <EventItem className="upcoming">
                <EventHeader>
                  <EventDate>
                    <EventMonth>November</EventMonth>
                    <EventDay>14</EventDay>
                    <EventYear>2025</EventYear>
                  </EventDate>
                  <EventDetails>
                    <EventTitle>Everest Lab Annual Meeting 2025</EventTitle>
                    <EventLocation>MIT CSAIL, Cambridge, MA</EventLocation>
                  </EventDetails>
                </EventHeader>
                <EventContent>
                  <EventDescription>
                    Join us for our annual meeting where lab members will present their latest research findings, discuss ongoing projects, and share insights on the future directions of AI-driven data systems. The event will feature technical talks, poster sessions, and networking opportunities.
                  </EventDescription>
                  <EventMeta>
                    <span>9:00 AM - 5:00 PM EST</span>
                    <span>In-Person Event</span>
                  </EventMeta>
                </EventContent>
              </EventItem>
            </EventsList>
          </Container>
        </Section>

        {/* Publications Section */}
        <Section id="publications">
          <Container>
            <SectionHeading>Publications</SectionHeading>

            <p style={{ textAlign: 'center', color: COLOR_TEXT_SECONDARY, marginBottom: '2rem' }}>
              For a complete list of publications from Everest Lab members, please visit the <a href="/publications" style={{ color: COLOR_PRIMARY, textDecoration: 'none', fontWeight: 500 }}>DSG Publications page</a>.
            </p>
          </Container>
        </Section>

        {/* Sponsors Section */}
        <Section id="sponsors" bgGray>
          <Container>
            <SectionHeading>Sponsors</SectionHeading>

            <SponsorsIntro>
              Our research is made possible through the generous support of industry partners and funding agencies who share our vision for advancing AI-driven data systems.
            </SponsorsIntro>

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

export const Head = () => <Seo title="Everest Lab | MIT CSAIL" />

export default EverestPage
