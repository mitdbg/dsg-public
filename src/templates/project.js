import React from 'react'
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import s from 'styled-components'

import Layout from "../components/layout"
import Seo from "../components/seo"
import { LIBRE_BOLD } from '../utils/font'
import { Wrapper } from '../components/shared'

const ProjectTitle = s.h2`
  ${LIBRE_BOLD}
  color: white;
  padding-left: 1rem;
  position: relative;
  z-index: 2;
`

const StyledBgWrapper = s.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #ebeef2;
`

const BgImageWrapper = s.div`
  position: absolute;
  inset: 0;
  & > * {
    width: 100%;
    height: 100%;
    filter: brightness(40%);
  }
`

const ProjectTemplate = ({ data, children }) => {
  const { mdx: { frontmatter: {image, title} } } = data
  const img = getImage(image)

  return (
    <Layout>
      <StyledBgWrapper>
        {img && (
          <BgImageWrapper>
            <GatsbyImage image={img} alt={title} />
          </BgImageWrapper>
        )}
        <ProjectTitle>{title}</ProjectTitle>
      </StyledBgWrapper>
      <Wrapper>
        <MDXProvider>
          {children}
        </MDXProvider>
      </Wrapper>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Project" />

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, quality: 100, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`

export default ProjectTemplate