'use client'

import NavBar from "@/components/NavBar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    const [userData, setUserData] = useState()

    // Check if a user session exists. If it exists then fetch the user data.
    useEffect(() => {
        axios.get('http://localhost:8000/api/user', {withCredentials: true})
        .then(({ data }) => {
            if (data.active_user_present && data.authenticated) {
                setUserData(data.data)
            }
        })
        .catch(console.error)
    }, [])

    return (
        <div className="flex justify-center">
            <div className="sm:w-4/5 md:w-[90%] lg:w-80%] xl:w-[75%] 2xl:w-[65%] min-[1600px]:w-[60%] mt-8">
                <NavBar userData={userData} />
                <HeroSection />
            </div>
        </div>
    )
}

function HeroSection() {
    return (<div>
        <div className="flex flex-col sm:flex-row items-center justify-between min-h-[80vh]">
            <div><img src="login_bg_0.svg" className="w-[40rem]"/></div>
            <div className="flex flex-col gap-12 w-min">
                <div className="text-center sm:text-right text-7xl font-bold leading-[1.6em]">
                    Enhance your
                    <br/>
                    Vocabulary
                </div>
                <div className="text-base leading-7 font-light text-center sm:text-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec felis tincidunt, tincidunt odio in, tristique mi. Proin semper, tortor vitae imperdiet sodales, 
                </div>
                <div className="text-center sm:text-right">
                    <Link href="/" className="px-8 py-4 ok-button text-base">Get Started</Link>
                </div>
            </div>
        </div>
    </div>)
}