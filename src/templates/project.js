import React from 'react'
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import BackgroundImage from 'gatsby-background-image'
import { getImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'
import s from 'styled-components'

import Layout from "../components/layout"
import Seo from "../components/seo"
import { LIBRE_BOLD } from '../utils/font'
import { Wrapper } from '../components/shared'

const ProjectTitle = s.h2`
  ${LIBRE_BOLD}
  color: white;
  padding-left: 1rem;
`

const StyledBg = s(BackgroundImage)`
  &::before, &::after {
    filter: brightness(40%);
  }
  display: flex;
  align-items: center;
`

const ProjectTemplate = ({ data, children }) => {
  const { mdx: { frontmatter: {image, title} } } = data
  const bgImage = convertToBgImage(getImage(image))

  return (
    <Layout>
      <StyledBg
        Tag="div"
        {...bgImage}
        style={{'height': '400px'}}
        className='align-middle'
        backgroundColor='#ebeef2'
      >
        <ProjectTitle>{title}</ProjectTitle>
      </StyledBg>
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