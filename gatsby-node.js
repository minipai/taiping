/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const _ = require('lodash')
const attractionTemplate = path.resolve(`src/templates/attraction.js`)
const tourTemplate = path.resolve(`src/templates/tour.js`)
const storeTemplate = path.resolve(`src/templates/store.js`)
const stayTemplate = path.resolve(`src/templates/stay.js`)
const uniqueTemplate = path.resolve(`src/templates/unique.js`)
const artistTemplate = path.resolve(`src/templates/artist.js`)

const doctypes = ['Attraction', 'Tour', 'Store', 'Stay', 'Unique', 'Artist']

const query = `{
  ${doctypes
    .map(
      doctype => `
        allPrismic${doctype} {
          edges {
            node {
              id
              slugs
            }
          }
        }
      `
    )
    .join('')}
}
`
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(query).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const createPageFromEdge = (path, template) => edge => {
          const shortId = _.last(edge.node.id.split('__'))
          createPage({
            path: `${path}/${shortId}`, // required
            component: template,
            context: {
              // Add optional context data. Data can be used as
              // arguments to the page GraphQL query.
              //
              // The page "path" is always available as a GraphQL
              // argument.
              id: edge.node.id,
            },
          })
        }

        result.data.allPrismicAttraction.edges.forEach(
          createPageFromEdge('attractions', attractionTemplate)
        )
        result.data.allPrismicTour.edges.forEach(
          createPageFromEdge('tours', tourTemplate)
        )
        result.data.allPrismicStore.edges.forEach(
          createPageFromEdge('stores', storeTemplate)
        )
        result.data.allPrismicStay.edges.forEach(
          createPageFromEdge('stays', stayTemplate)
        )
        result.data.allPrismicUnique.edges.forEach(
          createPageFromEdge('uniques', uniqueTemplate)
        )
        result.data.allPrismicArtist.edges.forEach(
          createPageFromEdge('artist', artistTemplate)
        )

        return
      })
    )
  })
}
