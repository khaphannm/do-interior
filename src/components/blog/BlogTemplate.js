import React from 'react'
// import PropTypes from 'prop-types';
import { graphql } from "gatsby";
// import Layout from "components/layout";
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled, {css} from 'styled-components';
import { BLOCKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Container } from 'react-bootstrap';

/* For reference https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/#provide-data-to-the-homepage--component */
// Need to add references to get image information, this is missing in the doc, but reveal by a friend, detail here:
// https://github.com/contentful/rich-text/issues/61#issuecomment-740691185
export const query = graphql`
    query($slug: String!) {
        contentfulBlogPost(slug: {eq:$slug}) {
            id
            title
            publishedDate(formatString: "DD/MM/YYYY HH:mm:ss")
            body {
                raw
                references {
                    ... on ContentfulAsset {
                        contentful_id
                        __typename
                        fluid(maxWidth: 2560) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
                }
            }
            thumbnailImage {
                file {
                    url 
                }
            }
        }
    }
`; 

const Section = styled.section`
    position: relative;
`
const Wrapper = styled.div`
    padding: 0 16px;
    padding-top: 56px;
    padding-bottom: 48px;
    min-height: 100vh;
    background-color: #fff;
    .embeddedImg {
        max-height: 800px;
        width: 100%;
        object-fit: cover;
        @media (max-width:600px) {
            max-height: 500px;
        }
    }
`

const PostImageContainer = styled.div`
    max-height: 1000px;
    overflow: hidden;
    position: relative;
    background-image: url('${props => props.img}');
    background-position: center center;
    background-size: cover;
    margin: 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width:600px) {
        height: 60vh;
    }
    @media (min-width:0px) and (max-width: 600px) {
        height: 30vh;
    }
    &:before {
        background: rgba(0, 0, 0, 0.5);
        color: #FFFFFF;
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .textContainer {
        z-index: 2;
    }
`;

const whiteText = css`
    color: #fff;
`
const BlogTitle = styled.h1`
    ${whiteText}
    font-size: 72px;
    font-weight: 800;
    @media (max-width:600px) {
        font-size: 36px;
    }
    @media (max-width:400px) {
        font-size: 16px;
    }
`;

const PublishDate = styled.p`
    ${whiteText}
    font-size: 16px;
    @media (max-width:600px) {
        font-size: 12px;
    }
`;

const options = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
            // const { title, description, file } = node.data.target.fields;
            return <img
                    className="embeddedImg"
                    alt="assets"
                    src={node.data.target.fluid.src}
                />
            // const mimeType = file['en-US'].contentType
            // const mimeGroup = mimeType.split('/')[0]

            // switch (mimeGroup) {
            //     case 'image':
            //     return <img
            //         title={ title ? title['en-US'] : null}
            //         alt={description ?  description['en-US'] : null}
            //         src={file['en-US'].url}
            //     />
            //     case 'application':
            //     return <a
            //             alt={description ?  description['en-US'] : null}
            //             href={file['en-US'].url}
            //             >{ title ? title['en-US'] : file['en-US'].details.fileName }
            //         </a>
            //     default:
            //         return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
            // } 
          },
      }, 
}

const BlogTemplate = ({data, ...props}) => {
    return (
        <Section>
            <PostImageContainer img={data.contentfulBlogPost.thumbnailImage.file.url}>
                <div className="textContainer">
                    <BlogTitle>{data.contentfulBlogPost.title}</BlogTitle>
                    <PublishDate>{data.contentfulBlogPost.publishedDate}</PublishDate>
                </div>
            </PostImageContainer>
            <Wrapper>
                <Container>
                    {renderRichText(data.contentfulBlogPost.body, options)} 
                </Container>
            </Wrapper>
        </Section>
    )
}

BlogTemplate.propTypes = {

}

export default BlogTemplate

