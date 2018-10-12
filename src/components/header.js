import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import MediaQuery from 'react-responsive'
import Toggle from 'react-toggled'
import Image from './image'

const MENU = [
  ['景點', '/attractions'],
  ['遊程', '/tours'],
  ['商家', '/stores'],
  ['住宿', '/stays'],
  ['地方特色', '/'],
  ['文環夜學', '/'],
]

const query = graphql`
  query {
    prismicHomepage {
      data {
        logo {
          url
        }
      }
    }
  }
`

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={query}
    render={data => {
      const logoSrc = data.prismicHomepage.data.logo.url
      return (
        <header id="header" className="header">
          <div className="header-inner header-fixed">
            <div className="container">
              <div className="logo">
                <Link to="/">
                  <Image src={logoSrc} alt="Logo" width={150} height={50} />
                </Link>
              </div>
              <Toggle>
                {({ on, getTogglerProps }) => (
                  <nav className="pi-navigation">
                    <MediaQuery maxWidth={800}>
                      <div className="open-menu" {...getTogglerProps()}>
                        <span className="item item-1" />
                        <span className="item item-2" />
                        <span className="item item-3" />
                      </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                      {matches => (
                        <ul
                          className={`
                      navlist 
                      ${matches ? 'off-canvas ' : ''} 
                      ${on ? 'off-canvas-active' : ''}
                    `}
                        >
                          {MENU.map(([menu, path], index) => (
                            <li key={index}>
                              <Link to={path}>{menu}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </MediaQuery>
                  </nav>
                )}
              </Toggle>
            </div>
          </div>
        </header>
      )
    }}
  />
)

export default Header
