import { useContext, useEffect } from 'react';
import { NavigationContext } from '../context/navigation';

import { motion, AnimatePresence } from "framer-motion"

import Link from 'next/link';

import { Sling as Hamburger } from 'hamburger-react'
import { Logo } from './icons'


export default function Nav() {
    const [state, setState] = useContext(NavigationContext)

    const hexValues = () => {
        if (state.colorTheme === "light") {
            return ["#212121", "#ECF3E7"]
        }

        return ["#ECF3E7", "#212121"]
    }

    useEffect(() => {
        document.body.style.position = state.isOpen ? "fixed" : ""
    }, [state.isOpen])

    return (
        <nav>
            <div className="fixed top-0 left-0 px-8 py-10 z-50 flex justify-between w-full">
                <Logo color={state.isOpen ? hexValues()[0] : hexValues()[1]} />
                <Hamburger
                    rounded
                    size={20}
                    toggled={state.isOpen}
                    toggle={() => setState({
                        ...state,
                        isOpen: !state.isOpen
                    })}
                    direction="x"
                    duration={0.5}
                    color={state.isOpen ? hexValues()[0] : hexValues()[1]}
                    easing="ease-out"
                    distance="lg"
                />
            </div>


            <AnimatePresence>
                {state.isOpen && (
                    <motion.div
                        className={`h-screen w-screen fixed z-40 ${state.colorTheme === "light" ? "bg-offWhite" : "bg-black"} flex justify-center items-center`}
                        initial={{ x: window.innerWidth }}
                        animate={{ x: 0 }}
                        exit={{ x: window.innerWidth }}
                        transition={{ duration: 0.3, type: "tween" }}
                    >
                        <ul className={`${state.colorTheme === "light" ? "text-black" : "text-offWhite"} font-ivy text-5xl`}>
                            <Link href="/"><li>Home</li></Link>
                            <Link href="/work"><li className="py-5">Work</li></Link>
                            <Link href="/approach"><li>Approach</li></Link>
                            <Link href="/about"><li className="py-5">About</li></Link>
                            <Link href="/contact"><li>Contact</li></Link>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}