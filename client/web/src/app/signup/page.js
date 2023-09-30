'use client'

import TxtBox from "@/components/TxtBox"
import axios from "axios"
import Link from "next/link"

import { useState } from "react"

export default function Join() {
    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className="w-full md:w-4/6 lg:w-1/2 flex flex-col gap-12 px-6 md:px-0">
                <SignUpHeading />
                <div className="sm:w-min flex flex-col gap-8">
                    <SignUpForm />
                    <SignInWithDivider />
                    <SignInWith />
                </div>
            </div>
        </div>
    )
}

export function SignUpHeading() {
    return (
        <div>
            <div className="text-slate-900 text-7xl md:text-5xl font-extrabold leading-[1.5em] font-primary mb-8">
                Get Started
            </div>
            <div className="text-slate-700 text-base tracking-[0em]">
                Creating Your Reading Log.
            </div>
        </div>
    )
}

export function SignUpForm() {
    const [email, setEmail] = useState()
    const [password, setPwd] = useState()

    const signupRequest = () => {
        console.log(email, password)
        axios.post("http://localhost:8000/api/join", {
            username: "hola",
            email, password,
        }, {
            withCredentials: true
        })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    return (
        <div>
            <div className="flex flex-col gap-4 mb-8">
                <div>
                    <TxtBox placeholder="Email" className="w-full md:w-[35em]"
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <TxtBox placeholder="Password" className="w-full md:w-[35em]"
                        onChange={e => setPwd(e.target.value)} />
                </div>
            </div>
            <div className="flex justify-between items-center gap-4">
                <div className="flex gap-4 [&>*]:text-base [&>*]:py-2 [&>*]:px-8">
                    <button className="ok-button" onClick={() => signupRequest()}>Join</button>
                    <Link href="/" className="cancel-button">Cancel</Link>
                </div>
                <Link href="/signin" className="text-sky-600 font-light tracking-wider text-right">Already have an account ?</Link>
            </div>
        </div>
    )
}

export function SignInWithDivider() {
    return (
        <div className="flex justify-between items-center [&>hr]:w-[44%] [&>hr]:border-zinc-300 text-zinc-400 font-extralight">
            <hr />
            Or
            <hr />
        </div>
    )
}

export function SignInWith() {
    return (
        <div>
            <button className="w-full sign-in-with-google">
                Sign In with Google
            </button>
        </div>
    )
}
