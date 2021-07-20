import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

export const query = graphql`
  query {
    prismicHomepage {
      data {
        hero_image {
          url
        }
      }
    }
  }
`

const IndexPage = props => {
const heroImage = props.data.prismicHomepage.data.hero_image.url
  const Hero = (
    <section class="site-hero">
      <Image src={heroImage} alt="" />
    </section>
  )

  return <Layout topComponent={Hero} />
}
export default IndexPage
