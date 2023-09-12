import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import _ from 'lodash'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { StyledLink, Wrapper, LinkTitle, Title, CardWrapper } from '../components/shared'

const Project = ({ title, link, summary, image }) => (
  <StyledLink to={`/projects${link}`}>
    <CardWrapper>
      <LinkTitle> {title} </LinkTitle>
      <GatsbyImage image={getImage(image)} className="img-fluid mx-auto d-block" style={{ marginBottom: '0.5rem' }} />
      <p> {summary} </p>
    </CardWrapper>
  </StyledLink>
  
)

const sections = {
  'current': 'Current Projects',
  'past': 'Past Projects'
}

const ProjectsPages = ({ data }) => {
  let projects = data.allMdx.nodes
  projects = projects.map(project => project.frontmatter)
  projects.sort((a, b) => a.title > b.title ? 1 : -1)

  projects = _.groupBy(projects, 'status')

  const statusList = Object.keys(sections)

  return (
    <Layout>
      <Wrapper>
        <div>
          {statusList.map(status => <><Title> {sections[status]} </Title> <div className='row' style={{ marginBottom: '3rem' }}>{projects[status].map(project =>  <div className='col-md-6'> <Project {...project} /> </div> ) } </div></>)}
        </div>
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
query {
  allMdx(filter: {internal: {contentFilePath: {glob: "**/projects/*"}}}) {
    nodes {
      frontmatter {
        title
        link
        summary
        status
        image {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: BLURRED, quality: 100)
          }
        }
      }
    }
  }
}
`

export const Head = () => <Seo title="Projects" />

export default ProjectsPages