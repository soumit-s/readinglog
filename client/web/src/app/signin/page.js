'use client'

import { FormTextField } from "@/components/FormTextField"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function Login() {
    return (
        <div className="flex justify-center">
            <div className="flex items-center justify-between min-h-screen
                sm:w-4/5 md:w-[90%] lg:w-80%] xl:w-[75%] 2xl:w-[65%] min-[1600px]:w-[60%]">
                <div className="w-max">
                    <div className="text-6xl mb-8 font-semibold text-emerald-950">
                        Log In
                    </div>
                    {/* <div className="mb-12 border-b-[1px] border-zinc-400 border-dashed"></div> */}
                    <div className="mb-8 font-light">
                        Sign In to your account and start improving
                    </div>
                    <div>
                        <LoginForm />
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="asset_0.svg" className="w-[35rem]" />
                </div>
            </div>
        </div>
    )
}

export function LoginForm() {
    const {push} = useRouter()
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    const [emailErrField, setEmailErrField] = useState()
    const [pwdErrField, setPwdErrField] = useState()

    const login = () => {
        // Clear the errors.
        setEmailErrField("")
        setPwdErrField("")

        axios.post("http://localhost:8000/api/signin", { email, password: pwd }, { withCredentials: true })
            .then(({ data: { ok, code, errors, redirect: redirectURI } }) => {
                if (ok) {
                    // Redirect to the user dashboard.
                    console.log('redirecting to', redirectURI)
                    push(redirectURI)
                    return
                }

                // Check if the user is already present.
                // In that case just redirect to the dashboard.
                if (code == 3) {
                    console.log("User already present")
                    push(redirectURI)
                }

                errors.forEach(e => {
                    const { field_name: fname, message: msg } = e
                    if (fname == "email") {
                        setEmailErrField(msg)
                    } else if (fname == "password") {
                        setPwdErrField(msg)
                    } else {
                        console.log(e)
                    }
                })
            })
            .catch(console.error)
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 [&>div>*]:min-w-[25rem]">
                <div>
                    <FormTextField placeholder="Email" error={emailErrField} onChange={e => setEmail(e.target.value) || setEmailErrField("") || setPwdErrField("")} />
                </div>
                <div className="flex gap-4">
                    <FormTextField type="password" placeholder="Password" error={pwdErrField} onChange={e => setPwd(e.target.value) || setPwdErrField("")} />
                </div>
            </div>
            <div>
                <label className="flex items-center font-light">
                    <input type="checkbox" className="mr-4" />
                    Remember Me
                </label>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button className="ok-button" onClick={_ => login()}>Login</button>
                    <a className="cancel-button" href="/">Cancel</a>
                </div>
                <div className="underline underline-offset-2">
                    <Link href="/" className="font-light">Forgot Password ?</Link>
                </div>
            </div>
            <div className="flex items-center">
                <hr className="flex-auto" />
                <i className="px-4 not-italic">Or</i>
                <hr className="flex-auto" />
            </div>
            <div className="flex flex-col gap-4">
                <button className="w-full ok-button">Create an Account</button>
                <Link href="" className="w-full text-center block sign-in-with-google">Sign In with Google</Link>
            </div>
        </div>
    )
}