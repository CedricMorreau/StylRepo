import Nav from "../components/navWhite"
import { GraphQLClient, gql } from 'graphql-request'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES} from '@contentful/rich-text-types'


import Image from 'next/image'


export const getStaticProps = async () => {
    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.CONTENFUL_ACCESS_KEY}`
        },
    })

    const aboutContentQuery = gql`
    {
      aboutCollection{
        items{
          title
          sys{
            id
          }
          headerImage{
            url
            height
            width
          }
          description{
            json
          }
        }
      }
    }    
      `

    const data = await graphQLClient.request(aboutContentQuery)

    return {
        props: { about: data.aboutCollection.items[0] }
    }

}

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: ( node, children) => {
      return <div><p className="font-avenirMedium text-offWhite">{children}</p><br /></div>
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return <a href={node.data.uri} className="font-avenirMedium">{children}</a>
    }
  }
}


export default function About({ about }) {

    return (
        <>
            <Nav />
            <div className="bg-black">
                <Image
                    src={about.headerImage.url}
                    width={about.headerImage.width}
                    height={about.headerImage.height}
                    alt="Hero image"
                />
                <div className="px-12 min-h-screen text-offWhite">
                  <span className="font-ivy text-4xl relative right-3 bottom-7">{about.title}</span>
                  <div className="pt-6">{documentToReactComponents(about.description.json, RICHTEXT_OPTIONS)}</div>
                </div>
            </div>
        </>
    )
}