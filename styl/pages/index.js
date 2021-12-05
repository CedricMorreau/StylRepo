import { GraphQLClient, gql } from 'graphql-request'


export const getStaticProps = async () => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CONTENFUL_ACCESS_KEY}`
    },
  })

      const listingsQuery = gql`
      {
        pageCollection{
          items {
            welcome1
            welcome2
            welcome3
            welcome4
            title
            tagline
            logo{
              url
            }
            sys{id}
          }
        }
      }
    `

    const data = await graphQLClient.request(listingsQuery)
  
    return {
      props: { homeContent: data.pageCollection.items }
    }
  }

export default function Home({ homeContent }) {
  console.log(homeContent)

  return (
    <div>
      {homeContent.map((homeContent) => <div
        key={homeContent.sys.id}
        >
        
        <h1>{homeContent.tagline}</h1>
        </div>)}
    </div>
  )
}
