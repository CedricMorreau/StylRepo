import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import Nav from "../components/nav"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-offWhite min-h-screen">
      <Nav />
      <div className="pt-5">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
