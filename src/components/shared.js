import s from 'styled-components'
import { Link } from 'gatsby'

import { GEORGIA_REGULAR, LIBRE_BLACK, LIBRE_BOLD } from '../utils/font'

export const Title = s.div`
  ${({ noBorder }) => noBorder ? '': 'border-left: 12px solid #D12D4A;'}
  padding: 0rem 1rem;
  text-align: left;
  font-size: 30px;
  ${LIBRE_BLACK}
  letter-spacing: 0px;
  color: #283033;
  opacity: 1;
`

export const Wrapper = s.div`
  ${({ font = GEORGIA_REGULAR }) => font}
  padding: 4rem 10rem;
  padding-bottom: 1rem;
  text-align: left;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export const StyledAnchor = s.a`
  color: #000000 !important;
  text-decoration: none !important;
`

export const StyledLink = s(Link)`
  color: #000000 !important;
  text-decoration: none !important;
`

const WHITE = '#FFFFFF'
export const CardWrapper = s.div`
  background-color: ${WHITE};
  border-radius: 24px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.06);
  padding: 2rem 1rem;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;
  :hover {
    transform: scale(1.01);
  }
  transition: all 0.3s;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    padding: 2rem 0;
    margin: 1rem 0.5rem;
  }
`

export const NoLinkTitle = s.h6`
  ${LIBRE_BOLD}
  color: #464242;
`

export const LinkTitle = s.h6`
  ${LIBRE_BOLD}
  color: #464242;
  transition: 0.3s;
  :hover {
    color: #B5B4B4;
    transition: 0.3s;
  }
`