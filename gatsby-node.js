const path = require('path')

exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        sections: path.resolve(__dirname, 'src/sections'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
  
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  
  /**
   * Blog page list according to Category (I.e: blog/category)
   */
  const blogListTemplate = path.resolve('./src/components/blog/blog.js');
  const blogListTemplate_res = await graphql(`
    query {
      allContentfulCategory {
        edges {
          node {
            id
            slug
            name
            category {
              id
            }
          }
        }
      }
    }
  `)
  for (const categoryEdge of blogListTemplate_res.data.allContentfulCategory.edges) {

    // blog.js could query the post from parent or child.
    const parentCategoryId = categoryEdge.node.id;
    const listCategoryIdFilter = categoryEdge.node.category ? [parentCategoryId].concat(categoryEdge.node.category.map(child => child.id)) : [parentCategoryId];
    createPage({
      component: blogListTemplate,
      path: `blog/${categoryEdge.node.slug}`,
      // This one will be added as props to Template component
      context: {
        categoryIds: listCategoryIdFilter,
        categoryName: categoryEdge.node.name,
        slug: categoryEdge.node.slug,
      }
    }) 

    /**
     * Specific Blog template (blog/category/blog_slug)
     */
    const specificBlogTemplate = path.resolve('./src/components/blog/BlogTemplate.js');
    const specificBlogs_Res = await graphql(`
      query {
        allContentfulBlogPost (filter:{
          categoryIds:{elemMatch:{id:{eq: "${categoryEdge.node.id}"}}}
        }) {
          edges {
            node {
              id
              slug
              categoryIds {
                id
                name
              }
            }
          }
        }
      }
    `)

    specificBlogs_Res.data.allContentfulBlogPost.edges.forEach((edge) => {
      createPage({
        component: specificBlogTemplate,
        path: `blog/${categoryEdge.node.slug}/${edge.node.slug}`,
        // This one will be added as props to Template component
        context: {
          slug: edge.node.slug,
        }
      })
    })
  };
}
