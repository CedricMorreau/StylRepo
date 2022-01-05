import { GraphQLClient, gql } from 'graphql-request'
import Nav from "../components/navBlack"

export const getStaticProps = async () => {
    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.CONTENFUL_ACCESS_KEY}`
        },
    })

    const approachContentQuery = gql`
    {
        approachCollection{
            items {
                number
                title
                description
                sys {
                    id
                  }
            }
        }
    }
    `

    const data = await graphQLClient.request(approachContentQuery)

    return {
        props: { approachContent: data.approachCollection.items }
    }
}

export default function Approach({ approachContent }) {

    return (
        <>
            <Nav />
            <div className="bg-offWhite min-h-screen">
                <div className="pt-28">
                    <div className="w-full h-full">
                        {approachContent.slice(0).reverse().map((project) => <div
                            key={project.sys.id}
                        >
                            <div className="mt-8 px-8 font-bold text-5xl font-ivy text-black">{project.number}<br /></div>
                            <div className="px-8 text-lg pt-8 font-bold text-black">{project.title}<br /></div>
                            <div className="px-8 pt-2 text-black">{project.description}<br /></div>
                            <hr className="mt-8 bg-black h-px border-0 rounded-full w-screen"></hr>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}