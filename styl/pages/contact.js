import { GraphQLClient, gql } from 'graphql-request'
import Nav from "../components/navBlack"

export const getStaticProps = async () => {
    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.CONTENFUL_ACCESS_KEY}`
        },
    })

    const contactContentQuery = gql`
    {
        contactCollection{
          items {
            title
            description
          }
        }
      }
    `

    const data = await graphQLClient.request(contactContentQuery)

    return {
        props: { contactContent: data.contactCollection.items[0] }
    }
}

export default function Approach({ contactContent }) {

    return (
        <>
            <Nav />
            <div className="bg-offWhite min-h-screen">
                <div className="pt-44 px-8">
                    <span className='font-ivy text-black text-6xl'>{contactContent.title}</span>
                    <p className='font-avenirMedium'>{contactContent.description}</p>
                </div>
            </div>
        </>
    )
}