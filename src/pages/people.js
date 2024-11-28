import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import _ from 'lodash'
import s from 'styled-components'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { Wrapper, Title, CardWrapper, StyledLink, LinkTitle, NoLinkTitle } from '../components/shared'

const PersonTitle = s(LinkTitle)`
  margin-top: 1rem;
  font-size: 100%;
  text-decoration: underline;
`

const PersonNoLinkTitle = s(NoLinkTitle)`
  margin-top: 1rem;
  font-size: 100%;
`


const Person = ({ name, image, link }) => {
  return (
    <CardWrapper className='col-md-2 justify-content-center'>
      {image && <GatsbyImage image={getImage(image)} className='img-fluid rounded-circle' /> }
      {link ? (<StyledLink href={link} target='_blank'><PersonTitle>{name}</PersonTitle></StyledLink>) : (<PersonNoLinkTitle>{name}</PersonNoLinkTitle>)}
    </CardWrapper>
  )
}

const sections = {
  'faculty': 'faculty',
  'associated': 'associated',
  'postdoc': 'Postdoctoral Students',
  'student': 'students',
  'visiting student': 'visiting students',
  'affiliate': 'affiliates',
  'alumni': 'alumni'
}

const PeoplePage = ({ data }) => {
  let people = data.allPeopleJson.edges
  people = people.map(person => person.node)
  // console.log(people.slice(0, 5))

  // use last name to sort
  people.sort((a, b) => a.name.split(' ').slice(-1) > b.name.split(' ').slice(-1) ? 1 : -1)
  // console.log(people.slice(0, 5))
  people = _.groupBy(people, 'type')

  return (
    <Layout>
      <Wrapper>
        {Object.keys(sections).map(section => (
          Boolean(section in people) &&  (
            <>
            <Title> {_.startCase(sections[section])} </Title>
              <div className="row justify-content-center" style={{ marginBottom: '2rem' }}>
                {people[section].map(person => <Person {...person} />)}
              </div>
            </>
          )
        ))}
      </Wrapper>
  
    </Layout>
  )
}

export const pageQuery = graphql`
query MyQuery {
  allPeopleJson {
    edges {
      node {
        name
        link
        type
        image {
          childImageSharp {
            gatsbyImageData(width: 200, placeholder: BLURRED, quality: 100)
          }
        }
      }
    }
  }
}
`

export const Head = () => <Seo title="People" />

export default PeoplePage