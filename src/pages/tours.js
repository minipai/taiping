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
        tour_description {
          html
          text
        }
      }
    }
    allPrismicTour {
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

export const buildTours = allPrismicTour =>
  allPrismicTour.edges.map(e => ({ id: e.node.id, ...e.node.data }))

const Tours = props => {
  const tours = buildTours(props.data.allPrismicTour)
  const description = props.data.prismicSite.data.tour_description
  return (
    <Layout
      className="layout2"
      topComponent={
        <Pagetitle title="旅遊行程" description={description.html} />
      }
    >
      <section className="blog-content blog-grid no-sidebar">
        <div className="row content">
          {tours.map(a => (
            <Postbox
              title={a.title.text}
              photo={a.photo.r360.url}
              content={truncate(a.content.text)}
              link={`/tours/${last(a.id.split('__'))}`}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Tours
