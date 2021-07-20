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
        artist_description {
          html
          text
        }
      }
    }
    allPrismicArtist {
      edges {
        node {
          id
          data {
            title {
              html
              text
            }
            image {
              alt
              copyright
              url
  
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

export const buildArtists = allPrismicArtist =>
  allPrismicArtist.edges.map(e => ({ id: e.node.id, ...e.node.data }))

const Artists = props => {
  const artists = buildArtists(props.data.allPrismicArtist)
  const description = props.data.prismicSite.data.artist_description
  return (
    <Layout
      className="layout2"
      topComponent={
        <Pagetitle title="文環夜學" description={description.html} />
      }
    >
      <section className="blog-content blog-grid no-sidebar">
        <div className="row content">
          {artists.map(a => (
            <Postbox
              title={a.title.text}
              photo={a.image.url}
              content={truncate(a.content.text)}
              link={`/artist/${last(a.id.split('__'))}`}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Artists
