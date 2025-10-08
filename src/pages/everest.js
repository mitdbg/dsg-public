import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import s from 'styled-components'

import Layout from "../components/layout"
import Seo from "../components/seo"
import EverestMDX from '../markdowns/everest.mdx'
import { GEORGIA_REGULAR, LIBRE_BOLD } from '../utils/font'
import { Wrapper } from '../components/shared'

const Caption = s.div`
  ${LIBRE_BOLD}
  font-size: 105%
`

const EverestPage = () => (
  <Layout everest>
    <Wrapper style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '18pt' }}>
      <EverestMDX />
    </Wrapper>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Everest" />

export default EverestPage
