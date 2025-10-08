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
    <Wrapper>
      <EverestMDX />
    </Wrapper>

    <!-- <div className="row" style={{ margin: '0 1rem' }}>
      <div className="col-md-10"> <StaticImage src='../images/dsail/retreat.jpg' placeholder="blurred" />  </div>
      <Caption className="col-md-2"> Industry partners, researchers and students came together to share research progress and ideas at the first annual DSAIL Research Retreat, held November 1, 2019, in Cambridge, Mass. (Missing from photo: co-director Sam Madden, who’s taking the photo.) </Caption>
    </div> -->

    <Wrapper>
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <StaticImage src='../images/dsail/amazon.png' placeholder="blurred"/>
        </div>
        <div className="col-md-4">
        <StaticImage src='../images/dsail/google.png' placeholder="blurred"/>
        </div>
        <div className="col-md-4">
        <StaticImage src='../images/dsail/intel.jpg' placeholder="blurred" />
        </div>
        <Caption> DSAIL is also supported by NSF award 1900933 III: Medium: Learning-based Synthesis of Data Processing Engines. </Caption>
      </div>
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
