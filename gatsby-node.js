const path = require("path")
const ProjectTemplate = path.resolve('./src/templates/project.js')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(filter: {internal: {contentFilePath: {glob: "**/projects/*"}}}) {
        nodes {
          id
          frontmatter {
            link
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // Create blog post pages.
  const projects = result.data.allMdx.nodes

  // you'll call `createPage` for each result
  projects.forEach(node => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: `/projects${node.frontmatter.link}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${ProjectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}