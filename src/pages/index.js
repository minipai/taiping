import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query {
    prismicHomepage {
      data {
        hero_image {
          alt
          url
        }
      }
    }
  }
`

const IndexPage = props => {
  const heroImage = props.data.prismicHomepage.data.hero_image.url
  const Hero = (
    <section class="blog-heading" style={{ background: `url(${heroImage})` }}>
      <div class="container text-center" />
    </section>
  )

  return <Layout topComponent={Hero} />
}
export default IndexPage
