import { GraphQLClient, gql } from 'graphql-request'
import { useContext, useEffect } from 'react';
import { NavigationContext } from '../context/navigation';



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

export default function Contact({ contactContent }) {
    const [_, setState] = useContext(NavigationContext)

    useEffect(() => {
      setState({
        isOpen: false, 
        colorTheme: "dark"
      })
    }, [])

    return (
        <>
            <div className="bg-offWhite min-h-screen">
                <div className="pt-32 px-8">
                    <span className='font-ivy text-black text-6xl'>{contactContent.title}</span>
                    <p className='font-avenirMedium pt-6'>{contactContent.description}</p>
                    <form className='pt-10' name='contact' method='POST' data-netlify='true'>
                        <p className='font-avenirMedium mb-1'>Hi my name is</p>
                            <input className='focus:outline-none w-64 mb-6 bg-offWhite border-b-2 border-black' type="text" name='name'></input>
                        <p className='mb-1 font-avenirMedium'>and my company's name is</p>
                            <input className='focus:outline-none w-64 mb-6 bg-offWhite border-b-2 border-black' type="text" name='Company'></input>
                        <p className='mb-1 font-avenirMedium'>I was wondering if</p>
                            <input className='focus:outline-none w-64 mb-6 bg-offWhite border-b-2 border-black' type="text" name="message"></input>
                        <p className='mb-1 font-avenirMedium'>My phone number is</p>
                            <input className='focus:outline-none w-64 mb-6 bg-offWhite border-b-2 border-black' type="text" name="number"></input>
                        <p className='mb-1 font-avenirMedium'>or send me an Email at:</p>
                            <input className='focus:outline-none w-64 mb-6 bg-offWhite border-b-2 border-black block' type="text" name='email'></input>
                        <button className='bg-black text-offWhite px-12 py-4 rounded-full font-ivy text-l mt-8' type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}