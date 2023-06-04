import * as React from "react"
// import { Link, Script, graphql } from 'gatsby'
// import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import s from 'styled-components'
import Slider from 'react-slick'

// import SwiperCore, { Autoplay, Navigation, Pagination, EffectFade } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Layout from "../components/layout"
import Seo from "../components/seo"
import HomeMDX from '../markdowns/home.mdx'
import { GEORGIA_REGULAR, LIBRE_BOLD } from '../utils/font'
import { Wrapper, CardWrapper, StyledAnchor, Title, LinkTitle } from '../components/shared'

import NewsJSON from '../json/news.json'
import CarouselJSON from '../json/carousel.json'

// SwiperCore.use([EffectFade, Pagination, Autoplay, Navigation])

const IndexWrapper = s(Wrapper)`
  .slick-next::before, .slick-prev::before {
    color: black;
  }
`

const NewsTitle = s(LinkTitle)`
  ${LIBRE_BOLD}
  margin-top: 1rem;
  font-size: 120%;
`

const Caption = s.p`
  ${LIBRE_BOLD}
  font-size: 95%;
  text-align: center;
  margin-top: 1rem;
`

const News = ({ title, date, link, image, location }) => {
  return (
    <StyledAnchor href={link} target="_blank"> 
      <CardWrapper>
        <img src={image} style={{ width: '250px' }} className="rounded mx-auto d-block" />
        <NewsTitle> {title} </NewsTitle>
        <p style={{float: 'left'}}> {location} </p>
        <p style={{marginLeft: 'auto'}}> {date} </p>
      </CardWrapper>
    </StyledAnchor>
  )
}

const IndexPage = () => {
  // let images = data.allCarouselJson.edges
  // images = images.map(image => image.node)
  
  return (
    <Layout>
      <IndexWrapper>
        <div className="row">
          <div className="col-md-8 border-right px-5">
            <HomeMDX />
            {/* <Swiper pagination={{dynamicBullets: true}} autoplay navigation loop effect="fade">
              <SwiperSlide> <StaticImage src="../images/carousel/2023_ski.jpg" /> <p> 2023 Skip Trip at Bretton Woods </p> </SwiperSlide>
              <SwiperSlide> <StaticImage src="../images/carousel/2022_xmas.jpg" /> <p> 2022 Christmas Dinner </p> </SwiperSlide>
              <SwiperSlide> <StaticImage src="../images/carousel/2022_sam.JPG" /> <p> 2022 Outing </p> </SwiperSlide>
              <SwiperSlide> <StaticImage src="../images/carousel/2022_sigmod.jpg" /> 2022 SIGMOD at Philadelphia </SwiperSlide>
              <SwiperSlide> <StaticImage src="../images/carousel/2022_marathon.jpg" /> 2022 Sam's Marathon </SwiperSlide>
            </Swiper> */}
            <Slider dots infinite slidesToScroll={1} slidesToShow={1} autoplay lazyLoad="progressive">
              {CarouselJSON.map(({ image, caption }) => <div><img src={image} className="img-fluid" /> <Caption> {caption} </Caption></div>)}
            </Slider>
          </div>
          <div className="col-md-4" style={{textAlign: 'left'}}>
            <Title noBorder>Recent news 🎉</Title>
            {NewsJSON.map(news => <News {...news} /> )}
          </div>
        </div>
      </IndexWrapper>
    </Layout>
  )
} 

// export const pageQuery = graphql`
// query MyQuery {
//   allCarouselJson {
//     edges {
//       node {
//         caption
//         image {
//           childImageSharp {
//             gatsbyImageData(width: 600, placeholder: NONE, quality: 100)
//           }
//         }
//       }
//     }
//   }
// }
// `

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
