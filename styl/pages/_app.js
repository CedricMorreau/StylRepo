import 'tailwindcss/tailwind.css'
import { NavigationProvider } from '../context/navigation'
import '../styles/index.css'
import Nav from "../components/nav"


function MyApp({ Component, pageProps }) {
  return (
    <NavigationProvider>
      <Nav />
      <Component {...pageProps} />
    </NavigationProvider>
  )
}

export default MyApp
