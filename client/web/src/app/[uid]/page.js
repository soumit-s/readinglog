'use client'

import ActionBar from "@/components/ActionBar"
import LogList from "@/components/LogList"
import SearchBox from "@/components/SearchBox"
import Prof1 from "@/svg/Prof1"
import { ReadingLogInfoSchema } from "@/utils/schemas"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { faker } from '@faker-js/faker'
import { useUserContext } from "@/utils/user"
import { deleteLog, fetchLogs, useLogs } from "@/utils/api"
import Loadable from "@/components/Loadable"

export default function Dashboard({ params }) {
    const { push } = useRouter()

    const user = useUserContext()
    const logs = useLogs()

    const [selected, setSelected] = useState({})

    const onDeleteLogs = () => {
        for (let logId in selected) {
            if (selected[logId]) {
                // Try deleting the log.
                deleteLog({ id: logId })
            }
        }
    }

    const onSelectAll = (entries) => {
        const allSelected = Object.values(selected).reduce((o, v) => o && v, true)
        setSelected(entries.reduce((s, log) => s[log.id] = !allSelected, {}))
    }

    useEffect(() => {
        // If user is not present, then redirect to
        // Sign In page.
        if (!user.isLoading && !user.isPresent) {
            push('/signin')
        }
    }, [user])

    return (
        <div className="flex justify-center">
            <div className="sm:w-4/5 md:w-[90%] lg:w-80%] xl:w-[75%] 2xl:w-[65%] min-[1600px]:w-[60%] mt-8">
                {/* <div className="border-l-[1px] border-l-zinc-300 sm:h-[70vh]"></div> */}
                <div className="flex w-full gap-12">
                    <div className="flex-auto">
                        <ActionBar
                            onNew={() => push(user.data.profileURL + '/new')}
                            onSelectAll={_ => onSelectAll(logs.logs)}
                            onDelete={_ => onDeleteLogs()}
                        />
                        <div className="mt-8">
                            <SearchBox placeholder="Search" />
                        </div>
                        <hr className="mt-8 border-zinc-300"></hr>
                        <div className="mt-8">
                            <Loadable isLoading={logs.isLoading}>
                                <LogList entries={logs.logs} selected={selected} setSelected={setSelected} />
                            </Loadable>
                        </div>
                    </div>
                    <div>
                        <ProfileArea userData={user.data} isLoading={user.isLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProfileArea({ userData, isLoading }) {
    console.log(userData)

    const pathname = usePathname()
    console.log(pathname)

    return (
        <div>
            <div className="w-12 h-12 md:w-32 md:h-32 rounded-lg border-[1px] border-zinc-400 overflow-hidden flex items-center justify-center bg-emerald-100 cursor-pointer">
                {!isLoading && userData && userData.picture &&
                    <img src={userData.picture}></img> ||
                    <Prof1 className="w-12 h-12 md:w-48 md:h-48 mt-12" />
                }
            </div>
            <div className="mt-8">
                <div className="text-lg font-bold">
                    {userData && userData.name}
                </div>
                <div className="text-zinc-500">{userData && userData.email}</div>
                <div className="mt-4">
                    <Link className="ok-button inline-block" href={`${pathname}/edit`}>Edit Profile</Link>
                </div>
            </div>
        </div>
    )
}

function generateDummyLogEntry() {
    return new ReadingLogInfoSchema({
        name: faker.lorem.words(5 + Math.trunc(Math.random() * 4)),
        date: faker.date.soon(),
        words: faker.word.words({ min: 5, max: 10 }).split(' ')
    })
}
