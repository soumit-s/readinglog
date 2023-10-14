'use client'

import LogEditor from "@/components/LogEditor"
import SiteLogo from "@/components/SiteLogo"
import UserProfileCard from "@/components/UserProfileCard"
import { postSaveLog, useLog, useUser } from "@/utils/api"
import { useEffect } from "react"

export default function ViewLogPage({ params }) {
    // The Log ID.
    const { lid } = params

    const user = useUser()
    const log = useLog(lid)

    const onSave = (data) => {
        postSaveLog({ id: Number.parseInt(lid), ...data })
            .then(console.log)
            .catch(console.error)
    }

    return (
        log.isLoading ?
            <div>Loading</div>
            :
            <div className="flex justify-center sm:pt-12 sm:pb-12 min-h-[80vh]">
                <div className="sm:w-3/4 lg:w-[75%] xl:w-[75%] 2xl:w-3/5">
                    <div className="flex justify-between items-center mb-8">
                        <SiteLogo className="text-lg" />
                        <UserProfileCard userData={user.data} isLoading={user.isLoading} />
                    </div>
                    <LogEditor
                        title={log.data.title}
                        content={log.data.content}
                        words={log.data.words}
                        onSave={onSave}
                    />
                </div>
            </div>
    )
}