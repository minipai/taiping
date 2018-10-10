import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    prismicHomepage {
      data {
        contact {
          html
          text
        }
      }
    }
  }
`

const Footer = ({ siteTitle }) => (
  <StaticQuery
    query={query}
    render={data => {
      const contact = data.prismicHomepage.data.contact.html
      return (
        <footer id="footer" className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="widget ">
                  <h4>交通方式</h4>
                  <div className="desc">
                    <p>
                      Subscribe now if you want to recieve updates and news via
                      email.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="widget">
                  <h4>聯絡資訊</h4>
                  <div dangerouslySetInnerHTML={{ __html: contact }} />
                </div>
              </div>
            </div>
            <div className="copyright text-center" />
          </div>
        </footer>
      )
    }}
  />
)

export default Footer
