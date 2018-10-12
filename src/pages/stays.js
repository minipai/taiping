import React from 'react'
import { graphql } from 'gatsby'
import { truncate, last } from 'lodash'
import Pagetitle from '../components/pagetitle'
import Layout from '../components/layout'
import Postbox from '../components/postbox'

export const query = graphql`
  query {
    prismicSite {
      data {
        stay_description {
          html
          text
        }
      }
    }
    allPrismicStay {
      edges {
        node {
          id
          data {
            title {
              html
              text
            }
            photo {
              alt
              copyright
              url
              r360 {
                url
              }
            }
            content {
              html
              text
            }
          }
        }
      }
    }
  }
`

export const buildStays = allPrismicStay =>
  allPrismicStay.edges.map(e => ({ id: e.node.id, ...e.node.data }))

const Stays = props => {
  const stays = buildStays(props.data.allPrismicStay)
  const description = props.data.prismicSite.data.stay_description
  return (
    <Layout
      className="layout2"
      topComponent={
        <Pagetitle title="旅遊行程" description={description.html} />
      }
    >
      <section className="blog-content blog-grid no-sidebar">
        <div className="row content">
          <div className="col-md-12">
            {stays.map(a => (
              <Postbox
                title={a.title.text}
                photo={a.photo.r360.url}
                content={truncate(a.content.text)}
                link={`/stays/${last(a.id.split('__'))}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Stays
