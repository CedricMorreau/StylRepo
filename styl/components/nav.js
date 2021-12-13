import { useState } from 'react';
import Link from 'next/link';
import { Sling as Hamburger } from 'hamburger-react'
import { Logo } from './icons'


export default function Nav() {
    const [isOpen, setOpen] = useState(false)


    return (
        <nav>
            <div className="fixed top-0 left-0 px-8 py-10 z-50 flex justify-between w-full">
                <Logo color={isOpen ? "#ECF3E7" : "#212121"} />
                <Hamburger
                    rounded
                    size={20}
                    toggled={isOpen}
                    toggle={setOpen}
                    direction="x"
                    duration={0.5}
                    color={isOpen ? "#ECF3E7" : "#212121"}
                    easing="ease-out"
                    distance="lg"
                />
            </div>


            {isOpen && (
                <div className="h-screen w-screen absolute z-40 bg-black flex justify-center items-center">
                    <ul className="text-offWhite font-ivy text-5xl">
                        <li>Home</li>
                        <Link href="/work"><li className="py-5">Work</li></Link>
                        <li>Approach</li>
                        <li className="py-5">About</li>
                        <li>Contact</li>
                    </ul>
                </div>
            )}
        </nav>
    )
}