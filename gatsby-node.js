const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    console.log(node.fileAbsolutePath)
    const slug = path.basename(node.fileAbsolutePath, ".mdx").split(/.md$/g)[0];
    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
    console.log(slug)
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  //dynamically create pages here
  //get path to template
  const blogTemplate = path.resolve("./src/templates/blog.js")
  //get slugs
  const response = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  //create new pages with unique slug
  response.data.allMdx.edges.forEach(edge => {
    console.log('edge', edge.node.fields.slug)
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
}
