'use client'

import ChangePasswordForm from "@/components/ChangePasswordForm"
import RectProfilePic from "@/components/RectProfilePic"
import SiteLogo from "@/components/SiteLogo"
import UserInfoChangeForm from "@/components/UserInfoChangeForm"
import { useUserContext } from "@/utils/user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { BsArrowRight as ArrowRight, BsImage, BsBookmarkFill as LogLogo } from 'react-icons/bs'
import { postEditUserInfo } from "@/utils/api"

export default function EditProfilePage() {
    const user = useUserContext()
    const { push } = useRouter()

    const onEditUserInfoSubmit = ({ name, bio }) => {
        postEditUserInfo({name, bio})
            .then(console.log)
            .catch(console.error)
    }

    useEffect(() => {
        if (!user.isLoading && !user.isPresent) {
            push('/')
        }
    }, [user])

    return (
        user.isLoading ?
            <span>Loading</span>
            :
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-fit">
                    <div className="mb-8 flex justify-between">

                        <SiteLogo className="text-base" />
                        <div className="hover:bg-zinc-200 p-2 rounded border-[1px] border-zinc-300 hover:border-zinc-400 bg-zinc-100 cursor-pointer transition-all text-zinc-400  hover:text-zinc-600" onClick={_ => push(user.data.profileURL)}>
                            <ArrowRight className="text-xl" />
                        </div>
                    </div>
                    <hr />
                    <div className="mt-8 flex gap-12 justify-stretch">
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="mb-8 text-xl font-bold">Edit Info</div>
                                <UserInfoChangeForm default={user.data} onSubmit={v => onEditUserInfoSubmit(v)}/>
                            </div>
                            <hr className="border-zinc-300" />
                            <div>
                                <div className="mb-8 text-xl font-bold">Change Password</div>
                                <ChangePasswordForm />
                            </div>
                        </div>
                        <div className="border-l-[1px] border-zinc-200"></div>
                        <div>
                            <RectProfilePic isLoading={user.isLoading} picture={user.data.picture} />
                            <div className="mt-4">
                                <div className="text-base font-bold">{user.data.name}</div>
                                <div className="text-zinc-500">{user.data.email}</div>
                            </div>
                            <button className="ok-button flex items-center gap-[1em] mt-4">
                                <BsImage />
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}