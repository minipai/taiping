import React from 'react'
import { last } from 'lodash'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'
import Postside from '../components/postside'
import Pagetitle from '../components/pagetitle'
import { buildUniques } from '../pages/uniques'

export const query = graphql`
  query($id: String!) {
    prismicUnique(id: { eq: $id }) {
      data {
        title {
          html
          text
        }
        photo {
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
    allPrismicUnique {
      edges {
        node {
          id
          data {
            title {
              text
            }
            photo {
              alt
              url
              s60 {
                url
              }
            }
            content {
              text
            }
          }
        }
      }
    }
  }
`

const PostPage = props => {
  const post = props.data.prismicUnique.data
  const uniques = buildUniques(props.data.allPrismicUnique)
  return (
    <Layout
      className="layout2"
      topComponent={<Pagetitle title={post.title.text} />}
    >
      <div className="row mt-5 content">
        <div className="col-md-9">
          <div className="blog-content">
            <Post
              title={post.title.text}
              photo={post.photo.url}
              content={post.content.html}
            />
          </div>
        </div>
        <div className="col-md-3 sidebar mt-0">
          <div className="widget">
            <h4 className="mb-0">景點介紹</h4>
            <ul>
              {uniques.map(a => (
                <li>
                  <Postside
                    title={a.title.text}
                    photo={a.photo.s60.url}
                    link={`/uniques/${last(a.id.split('__'))}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage
