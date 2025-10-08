import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { StyledLink } from './shared'

const NavText = s.text`
  font-size: 110%;
  font-family: 'Libre Franklin', sans-serif;
  color: #283033;
  transition: 0.3s;
  :hover {
    color: #B5B4B4;
    transition: 0.3s;
  }
`

const NavbarWrapper = s.nav`
  z-index: 1;
`

const Image = s.img`
  max-height: 80px;
  @media (max-width: 768px) {
    max-height: 30px;
  }
`

const RightUL = s.ul`
  margin-left: 1rem;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const NavBar = ({ dsail, everest}) => {
  var imageSource = dsail ? '/images/dsail-logo.png': '/images/dsg-logo.png'
  imageSource = everest ? '/images/everest-logo.png': imageSource

  return (
    <NavbarWrapper
      className="navbar sticky-top navbar-expand-lg"
      style={{
        fontFamily: 'Libre Franklin',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 5px 6px #00000029',
        opacity: 1,
        padding: '0 5rem'
      }}
    >
      <div className="my-2 order-0 order-md-1 position-relative" style={{ textAlign: 'center' }}>
        <StyledLink to='/'>
          <Image src={imageSource} className="img-fluid" />
        </StyledLink>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-expanded="false">
          <span className="navbar-toggler-icon"><img src="/images/menu.svg" style={{ transform: 'translate(0, 0.2rem)' }} /></span>
        </button>
      </div>
      <div className="navbar-collapse w-100 dual-collapse2 order-2 order-md-2 collapse">
        <RightUL className="navbar-nav ml-auto text-center">
          <li className="nav-item active">
            <Link className="nav-link" to="/"><NavText> Home </NavText></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/projects"><NavText> Projects </NavText></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/people"><NavText> People </NavText></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/publications"><NavText> Publications </NavText></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dsail"><NavText> DSAIL </NavText></Link>
          </li>
        </RightUL>
      </div>
    </NavbarWrapper>
  )
}

export default NavBar