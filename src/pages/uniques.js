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
        unique_description {
          html
          text
        }
      }
    }
    allPrismicUnique {
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

export const buildUniques = allPrismicUnique =>
  allPrismicUnique.edges.map(e => ({ id: e.node.id, ...e.node.data }))

const Uniques = props => {
  const uniques = buildUniques(props.data.allPrismicUnique)
  const description = props.data.prismicSite.data.unique_description
  return (
    <Layout
      className="layout2"
      topComponent={
        <Pagetitle title="地方特色" description={description.html} />
      }
    >
      <section className="blog-content blog-grid no-sidebar">
        <div className="row content">
          <div className="col-md-12">
            {uniques.map(a => (
              <Postbox
                title={a.title.text}
                photo={a.photo.r360.url}
                content={truncate(a.content.text)}
                link={`/uniques/${last(a.id.split('__'))}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Uniques
