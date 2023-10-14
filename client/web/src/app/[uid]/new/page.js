'use client'

import LogEditor from "@/components/LogEditor";
import SiteLogo from "@/components/SiteLogo";
import UserProfileCard from "@/components/UserProfileCard";
import { postCreateLog } from "@/utils/api";
import { useUserContext } from "@/utils/user";

export default function New() {
    const user = useUserContext()

    const onSave = (data) => {
        postCreateLog(data)
            .then(console.log)
            .catch(console.error)
    }

    return (
        <div className="flex justify-center">
            <div className="sm:w-3/4 lg:w-3/5 sm:pt-12">
                <div className="flex justify-between items-center mb-8">
                    <SiteLogo className="text-lg" />
                    <UserProfileCard userData={user.data} isLoading={user.isLoading}/>
                </div>
                <LogEditor onSave={onSave}/>
            </div>
        </div>
    )
}

