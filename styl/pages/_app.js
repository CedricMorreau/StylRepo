import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import Nav from "../components/nav"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
