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
        attraction_description {
          html
          text
        }
      }
    }
    allPrismicAttraction {
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

export const buildAttractions = allPrismicAttraction =>
  allPrismicAttraction.edges.map(e => ({ id: e.node.id, ...e.node.data }))

const Attractions = props => {
  const attractions = buildAttractions(props.data.allPrismicAttraction)
  const description = props.data.prismicSite.data.attraction_description
  return (
    <Layout
      className="layout2"
      topComponent={
        <Pagetitle title="景點介紹" description={description.html} />
      }
    >
      <section className="blog-content blog-grid no-sidebar">
        <div className="row content">
          <div className="col-md-12">
            {attractions.map(a => (
              <Postbox
                title={a.title.text}
                photo={a.photo.r360.url}
                content={truncate(a.content.text)}
                link={`/attractions/${last(a.id.split('__'))}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Attractions
