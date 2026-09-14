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

const footerBackground = ({ dsail, everest }) => {
  if (everest) return '#A31F34'
  return dsail ? 'rgba(177,0,28,0.8)' : 'rgba(233,210,73,1)'
}

const footerText = ({ dsail, everest }) => (dsail || everest) ? '#FFFFFF' : '#000000'

const Footer = s.div`
  margin-top: ${({ everest }) => everest ? '0' : '2rem'};
  background-color: ${footerBackground};
  color: ${footerText};
  font-family: 'Roboto', sans-serif;
  text-align: center;
  padding: 1rem;
  font-size: 80%;

  a {
    color: ${footerText} !important;
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
      {!everest && <NavBar dsail={dsail} everest={everest} />}
      <div
        style={{
          margin: everest ? '0' : `0 auto`,
          maxWidth: everest ? 'none' : `var(--size-content)`,
          padding: everest ? '0' : `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
        <Footer dsail={dsail} everest={everest}>
          © {new Date().getFullYear()} &middot; Built with 💖 by DSG @ MIT.
          {` `}
          <a href="https://accessibility.mit.edu/">Accessibility</a>.
        </Footer>
      </div>
    </>
  )
}

export default Layout
