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
  
  /*Create page with all projects trong Dự án Navigation*/
  const allDuAnTemplate = path.resolve('./src/components/blog/all-blogs.js'); 
  // Query Du an Navigation, should return array of 1 item
  const allCategoryUnderNavigation = await graphql(`
    query {
      allContentfulNavigation(filter:{navigationTitle:{eq:"Dự án"}}) {
        edges {
          node {
            id
            navigationTitle
            categoryNestedList{
              id
              name
              slug
              category {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  `)
  // console.log("🚀 ~ file: gatsby-node.js ~ line 51 ~ exports.createPages= ~ allCategoryUnderNavigation", allCategoryUnderNavigation)
  
  // Get all nested categoryids (include child category level as well) of that navigate
  const allCategoryUnderNavigationIds = allCategoryUnderNavigation.data.allContentfulNavigation.edges[0].node.categoryNestedList.reduce((prev, current, index) => {
    const newArray = [...prev, ...current.category.map(childCategory => childCategory.id)];
    return newArray;
  }, []); 
  // console.log("🚀 ~ file: gatsby-node.js ~ line 53 ~ exports.createPages= ~ allCategoryUnderNavigationIds", allCategoryUnderNavigationIds)
  // Create /blog/all-projects
  createPage({
    component: allDuAnTemplate,
    path: `blog/all-projects`,
    // This one will be added as props to Template component
    context: {
      categoryIds: allCategoryUnderNavigationIds,
    }
  }) 
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
          id: edge.node.id
        }
      })
    })
  };
}
