import * as React from "react"
import s, { createGlobalStyle } from 'styled-components'
import Layout from "../components/layout"
import Seo from "../components/seo"
import LogoCircular from '../images/everest/logo_circular.png'
import LogoMain from '../images/everest/logo.png'

// Global styles
const GlobalStyle = createGlobalStyle`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    margin: 0 !important;
    padding: 0 !important;
  }

  main {
    margin: 0 !important;
    padding: 0 !important;
  }

  body > div,
  body > div > div {
    margin: 0 !important;
    padding: 0 !important;
  }

  body,
  h1, h2, h3, h4, h5, h6,
  p, span, a, button, li {
    font-family: 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
  }
`

// MIT Red color scheme
const COLOR_PRIMARY = '#A31F34'
const COLOR_PRIMARY_DARK = '#8B1A2D'
const COLOR_GRAY_100 = '#F5F5F5'
const COLOR_GRAY_300 = '#D1D1D1'
const COLOR_BORDER = '#D1D1D1'
const COLOR_TEXT = '#1A1A1A'
const COLOR_TEXT_SECONDARY = '#3A3A3A'
const COLOR_WHITE = '#FFFFFF'

// Styled Components
const PageWrapper = s.div`
  min-height: 100vh;
  background-color: ${COLOR_GRAY_100};
  padding-top: 70px;
`

const Header = s.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${COLOR_WHITE};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 999;
`

const HeaderContainer = s.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  height: 70px;
  gap: 1rem;
`

const BackLink = s.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${COLOR_PRIMARY};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`

const HeaderTitle = s.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLOR_TEXT};
  margin: 0;
  flex: 1;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`

const Container = s.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`

const HeroSection = s.div`
  background-color: ${COLOR_WHITE};
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`

const EventTitle = s.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${COLOR_PRIMARY};
  margin: 0 0 1rem 0;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

const EventInfo = s.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const InfoItem = s.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoLabel = s.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLOR_TEXT_SECONDARY};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const InfoValue = s.div`
  font-size: 1.125rem;
  color: ${COLOR_TEXT};
  line-height: 1.5;
`

const AgendaSection = s.div`
  background-color: ${COLOR_WHITE};
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`

const SectionHeading = s.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLOR_TEXT};
  margin: 0 0 2rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${COLOR_BORDER};
`

const SessionBlock = s.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SessionTitle = s.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLOR_PRIMARY};
  margin: 0 0 1rem 0;
  line-height: 1.2;
`

const TalkItem = s.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${COLOR_GRAY_300};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const TalkTime = s.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLOR_PRIMARY};
  min-width: 120px;
  flex-shrink: 0;
  padding-top: 0.125rem;

  @media (max-width: 640px) {
    min-width: auto;
  }
`

const TalkContent = s.div`
  flex: 1;
`

const TalkTitle = s.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 0.25rem;
  line-height: 1.4;
`

const TalkSpeaker = s.div`
  font-size: 0.875rem;
  color: ${COLOR_TEXT_SECONDARY};
  line-height: 1.4;
`

const BreakItem = s(TalkItem)`
  background-color: ${COLOR_GRAY_100};
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border-bottom: none;
`

const EverestAnnualMeeting2025 = () => {
  return (
    <Layout everest>
      <GlobalStyle />
      <PageWrapper>
        <Header>
          <HeaderContainer>
            <BackLink href="/everest">
              <span>←</span>
              <span>Back to Everest</span>
            </BackLink>
            <HeaderTitle>Annual Meeting 2025</HeaderTitle>
          </HeaderContainer>
        </Header>

        <Container>
          <HeroSection>
            <EventTitle>Everest Lab Annual Meeting 2025</EventTitle>

            <EventInfo>
              <InfoItem>
                <InfoLabel>Date</InfoLabel>
                <InfoValue>Friday, November 14, 2025</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Time</InfoLabel>
                <InfoValue>8:30 AM – 6:00 PM EST</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>
                  MIT Building 45, 8th Floor<br />
                  51 Vassar Street, Cambridge, MA
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Format</InfoLabel>
                <InfoValue>In-Person Event</InfoValue>
              </InfoItem>
            </EventInfo>
          </HeroSection>

          <AgendaSection>
            <SectionHeading>Agenda</SectionHeading>

            <TalkItem>
              <TalkTime>8:30-9:00 AM</TalkTime>
              <TalkContent>
                <TalkTitle>Coffee and Light Breakfast</TalkTitle>
              </TalkContent>
            </TalkItem>

            <TalkItem>
              <TalkTime>9:00-9:10 AM</TalkTime>
              <TalkContent>
                <TalkTitle>Intros and Welcome</TalkTitle>
                <TalkSpeaker>Mike Cafarella, Tim Kraska, Sam Madden</TalkSpeaker>
              </TalkContent>
            </TalkItem>

            <SessionBlock>
              <SessionTitle>Session 1 – AI Infrastructure 1</SessionTitle>

              <TalkItem>
                <TalkTime>9:10–9:25 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Continual Learning in practice [and in theory]</TalkTitle>
                  <TalkSpeaker>Murali Narayanaswamy, Amazon</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>9:25–9:40 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>State of Palimpzest Project & Demo</TalkTitle>
                  <TalkSpeaker>PZ Team, Matthew Russo, Gerardo Vitagliano, Mike Cafarella, Sam Madden, Tim Kraska</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>9:40–9:55 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Log Augmented Generation</TalkTitle>
                  <TalkSpeaker>Peter Baile Chen</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>9:55–10:10 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>State of DSPy Project</TalkTitle>
                  <TalkSpeaker>Omar Khattab</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>

            <SessionBlock>
              <SessionTitle>Session 2 – AI Programming and D4</SessionTitle>

              <TalkItem>
                <TalkTime>10:10–10:25 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Project Overview and Demo</TalkTitle>
                  <TalkSpeaker>D4 Team, Jason Mohoney, James Moore, Amadou Ngom, Ziniu Wu, and Alex Zhang, Tim Kraska and Sam Madden</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>10:25–10:50 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Uplift/Downlift</TalkTitle>
                  <TalkSpeaker>James Moore</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>10:50–11:05 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Self-correcting code generation</TalkTitle>
                  <TalkSpeaker>Amadou Ngom</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>

            <BreakItem>
              <TalkTime>11:05–11:20 AM</TalkTime>
              <TalkContent>
                <TalkTitle>Break</TalkTitle>
              </TalkContent>
            </BreakItem>

            <SessionBlock>
              <SessionTitle>Session 3 – ML For Systems</SessionTitle>

              <TalkItem>
                <TalkTime>11:20–11:35 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Scaling to Meet the Needs of Agentic AI</TalkTitle>
                  <TalkSpeaker>Pradeep Dubey, Intel</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>11:35–11:50 AM</TalkTime>
                <TalkContent>
                  <TalkTitle>Automated Data Infrastructure Management with Brad</TalkTitle>
                  <TalkSpeaker>Geoffrey Yu</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>11:50–12:05 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Robust Query Optimization</TalkTitle>
                  <TalkSpeaker>Ziniu Wu</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>

            <BreakItem>
              <TalkTime>12:05-1:05 PM</TalkTime>
              <TalkContent>
                <TalkTitle>Lunch</TalkTitle>
              </TalkContent>
            </BreakItem>

            <SessionBlock>
              <SessionTitle>Session 4 – AI Infrastructure 2</SessionTitle>

              <TalkItem>
                <TalkTime>1:05-1:20 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Agentic Debugging</TalkTitle>
                  <TalkSpeaker>Sam Madden</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>1:20-1:35 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Next Generation Vector Databases</TalkTitle>
                  <TalkSpeaker>Sylvia Zhang</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>

            <SessionBlock>
              <SessionTitle>Session 5 - AI for Data Science</SessionTitle>

              <TalkItem>
                <TalkTime>1:35 - 1:50 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Disrupting Finance with AI</TalkTitle>
                  <TalkSpeaker>HP Bunaes, TWG</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>1:50-2:05 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>KramaBench</TalkTitle>
                  <TalkSpeaker>Gerardo Vitagliano</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>2:05-2:20 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Optimizable AI Systems</TalkTitle>
                  <TalkSpeaker>Peter Baile Chen</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>2:20-2:35 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Carnot: Deep Research w/Cost-Based Optimization</TalkTitle>
                  <TalkSpeaker>Matthew Russo</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>2:35-2:50 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Causal Compression</TalkTitle>
                  <TalkSpeaker>Anna Zeng</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>

            <BreakItem>
              <TalkTime>2:50-3:00 PM</TalkTime>
              <TalkContent>
                <TalkTitle>Break</TalkTitle>
              </TalkContent>
            </BreakItem>

            <SessionBlock>
              <SessionTitle>Session 6 - Multimodal AI</SessionTitle>

              <TalkItem>
                <TalkTime>3:00-3:15 PM</TalkTime>
                <TalkContent>
                  <TalkSpeaker>Anthony Karthik, Accenture</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>3:15-3:30 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Learned Video Search</TalkTitle>
                  <TalkSpeaker>Darryl Ho</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>3:30-3:45 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>Materials Science Discovery</TalkTitle>
                  <TalkSpeaker>Eugenie Lai</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime>3:45-4:00 PM</TalkTime>
                <TalkContent>
                  <TalkTitle>AI for Manufacturing and Design</TalkTitle>
                  <TalkSpeaker>Mike Cafarella</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>

            <TalkItem>
              <TalkTime>4:00-4:45 PM</TalkTime>
              <TalkContent>
                <TalkTitle>Brainstorming and next steps</TalkTitle>
              </TalkContent>
            </TalkItem>

            <TalkItem>
              <TalkTime>4:45-6:00 PM</TalkTime>
              <TalkContent>
                <TalkTitle>Reception and Poster Session</TalkTitle>
              </TalkContent>
            </TalkItem>

            <SessionBlock style={{ marginTop: '3rem' }}>
              <SessionTitle>Posters</SessionTitle>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Deep Research is the New Analytics System: Towards Building the Runtime for AI Driven Analytics</TalkTitle>
                  <TalkSpeaker>Matthew Russo</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>KramaBench: A Benchmark for AI Systems on Data-to-Insight Pipelines over Data Lakes</TalkTitle>
                  <TalkSpeaker>Gerardo Vitagliano</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Don't Repeat Yourself: A Lesson-Driven Agentic System for Error-Free Data Science</TalkTitle>
                  <TalkSpeaker>Sushrut Borkar</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>D4X: Design-Doc Driven, Self-Designing Agentic Systems For Long-Horizon, Complex Tasks</TalkTitle>
                  <TalkSpeaker>Amadou Latyr Ngom</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>From Logs to Causal Inference: Diagnosing Large Systems</TalkTitle>
                  <TalkSpeaker>Markos Markakis</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>DejaVid: Encoder-Agnostic Learned Temporal Matching for Video Classification</TalkTitle>
                  <TalkSpeaker>Darryl Ho</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Blueprinting the Cloud: Unifying and Automatically Optimizing Cloud Data Infrastructures with BRAD</TalkTitle>
                  <TalkSpeaker>Geoffrey Yu</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Auto-Prep: Holistic Prediction of Data Preparation Steps for Business Intelligence</TalkTitle>
                  <TalkSpeaker>Eugenie Lai</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>BackTranslation: Learning to Generate Code Repositories</TalkTitle>
                  <TalkSpeaker>James Moore</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Prism: Synchronized Views for Collaborative Software Development</TalkTitle>
                  <TalkSpeaker>Jason Mohoney</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Archi: Knowledge Discovery and Retrieval at CERN</TalkTitle>
                  <TalkSpeaker>Luca Lavezzo, Pietro Lugato</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>SmartVSS: Towards A Unified System for Reasoning-intensive Retrieval Tasks</TalkTitle>
                  <TalkSpeaker>Sylvia Zhang</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Beyond Vector Search: Self-Designing Semantic Indexing for Natural Language Queries</TalkTitle>
                  <TalkSpeaker>Zhuohan Gu, Tianyu Li</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>High Performance Buffer Management for Vector Search</TalkTitle>
                  <TalkSpeaker>Xinjing Zhou</TalkSpeaker>
                </TalkContent>
              </TalkItem>

              <TalkItem>
                <TalkTime></TalkTime>
                <TalkContent>
                  <TalkTitle>Causal DAG Summarization</TalkTitle>
                  <TalkSpeaker>Anna Zeng</TalkSpeaker>
                </TalkContent>
              </TalkItem>
            </SessionBlock>
          </AgendaSection>
        </Container>
      </PageWrapper>
    </Layout>
  )
}

export const Head = () => <Seo title="Everest Lab Annual Meeting 2025 | MIT CSAIL" />

export default EverestAnnualMeeting2025