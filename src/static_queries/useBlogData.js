import { graphql, useStaticQuery } from "gatsby"

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query getBlogData {
      allMdx(sort: { order: DESC, fields: frontmatter___date }, filter: {frontmatter: {title: {regex: "/./g"}}}) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              author
              title
              hero_image {
                childImageSharp {
                  fluid( maxWidth: 800 ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt(pruneLength: 200)
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return data.allMdx.edges
}
