/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import s from 'styled-components'

import Header from "./header"
import "./layout.css"
import NavBar from "./navbar"

const Footer = s.div`
  margin-top: 2rem;
  background-color: ${({ dsail }) => dsail ? 'rgba(177,0,28,0.8)' : 'rgba(233,210,73,1)'};
  color: ${({ dsail }) => dsail ? '#FFFFFF' : '#000000'};
  font-family: 'Roboto', sans-serif;
  text-align: center;
  padding: 1rem;
  font-size: 80%;

  a {
    color: ${({ dsail }) => dsail ? '#FFFFFF' : '#000000'} !important;
  }
`

const Layout = ({ children, dsail=false, everest=false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <NavBar dsail={dsail} everest={everest} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
        <Footer dsail={dsail}>
          © {new Date().getFullYear()} &middot; Built with 💖 by DSG @ MIT.
          {` `}
          <a href="https://accessibility.mit.edu/">Accessibility</a>.
        </Footer>
      </div>
    </>
  )
}

export default Layout
