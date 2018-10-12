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
        store_description {
          html
          text
        }
      }
    }
    allPrismicStore {
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

export const buildStores = allPrismicStore =>
  allPrismicStore.edges.map(e => ({ id: e.node.id, ...e.node.data }))

const Stores = props => {
  const stores = buildStores(props.data.allPrismicStore)
  const description = props.data.prismicSite.data.store_description
  return (
    <Layout
      className="layout2"
      topComponent={
        <Pagetitle title="商家介紹" description={description.html} />
      }
    >
      <section className="blog-content blog-grid no-sidebar">
        <div className="row content">
          <div className="col-md-12">
            {stores.map(a => (
              <Postbox
                title={a.title.text}
                photo={a.photo.r360.url}
                content={truncate(a.content.text)}
                link={`/stores/${last(a.id.split('__'))}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Stores
