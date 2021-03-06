import { GraphQLClient, gql } from 'graphql-request'
import Image from 'next/image'

import { motion } from "framer-motion"

import { useContext, useEffect } from 'react';
import { NavigationContext } from '../context/navigation';


export const getStaticProps = async () => {
    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.CONTENFUL_ACCESS_KEY}`
        },
    })

    const workContentQuery = gql`
    {
        workCollection{
          items{
            heroImage{
              url
              width
              height
            }
            workNumber
            title
            sys{
              id
            }
          }
        }
      }
      `

    const data = await graphQLClient.request(workContentQuery)

    return {
        props: { workContent: data.workCollection.items }
    }

}


export default function Work({ workContent }) {
    const [_, setState] = useContext(NavigationContext)

    useEffect(() => {
      setState({
        isOpen: false, 
        colorTheme: "light"
      })
    }, [])

    return (
        <>
            <div className="px-8 py-10 bg-black min-h-screen text-offWhite">
                <div className="Home-contect_wrapper pt-28 pb-14">
                    {workContent.slice(0).reverse().map((work) => <div
                        key={work.sys.id}
                        className="py-8"
                    >
                        <Image
                            src={work.heroImage.url}
                            width={work.heroImage.width}
                            height={work.heroImage.height}
                            alt="Hero image"
                        />

                        <motion.hr
                            initial={{ width: 0 }}
                            whileInView={{ width: 200 }}
                            viewport={{ once: true }}
                            className="bg-offWhite h-0.5 border-0 rounded-full mt-2"></motion.hr
                        >

                        <div className="pt-3 font-avenirMedium">{work.workNumber}<br /></div>
                        <div className="pt-2 text-lg font-avenirMedium">{work.title}</div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}