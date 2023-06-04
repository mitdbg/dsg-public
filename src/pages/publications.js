import React from 'react'
import s from 'styled-components'
import Collapsible from 'react-collapsible'
import _ from 'lodash'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { StyledLink, Wrapper, LinkTitle } from '../components/shared'
import { GEORGIA_REGULAR } from '../utils/font'

import PubJSON from '../json/pubs.json'

const PubAuthors = s.p`
  color: ${({ color = '#707070' }) => color};
  ${GEORGIA_REGULAR}
  font-size: 80%;
  a {
    color: #D12D4A;
  }
`

const Publication = ({ title, authors, url, venue, year }) => {
  return (
    <div>
      <StyledLink href={url} target='_blank'>
        <LinkTitle> {title} <i>{venue}, {year}</i> </LinkTitle>
      </StyledLink>
      <PubAuthors> {authors} </PubAuthors>
    </div>
  )
}

const PubPage = () => {
  const PubData = _.groupBy(PubJSON, 'year')
  let years = Object.keys(PubData)
  years.sort()
  years.reverse()

  return (
    <Layout>
      <Wrapper>
        <div style={{ margin: '0 1rem' }}>
          {/* <p> Our researchers have been working for years on how to apply AI/ML to data systems and data systems to AI/ML Here’s a list of some of the papers that they’ve published.  Check back frequently for new publications coming out of the collaborative efforts of the DSAIL team. </p> */}
          {years.map(year =>
            (<Collapsible trigger={`${year} (${PubData[year].length} publications)`} triggerStyle={{'cursor': 'pointer', 'fontSize': '120%'}} open={true} transitionTime={500}> {PubData[year].map(pub => <Publication {...pub} />)} </Collapsible>))
          }
        </div>
      </Wrapper>
    </Layout>
  )
}

export const Head = () => <Seo title="Publications" />

export default PubPage