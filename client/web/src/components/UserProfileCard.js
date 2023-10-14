import Prof1 from "@/svg/Prof1";

import { useRouter } from "next/navigation";

export default function UserProfileCard({ userData, isLoading, ...props }) {

    const router = useRouter()

    const gotoProfile = () => {
        if (isLoading) {
            return
        }

        router.push(userData.profileURL)
    }

    return (
        isLoading ? 
        
        <UserDpLoading />
        :
        <div className="w-12 h-12 rounded-[100%] border-[1px] border-zinc-400 overflow-hidden flex items-center justify-center bg-emerald-100 cursor-pointer" onClick={gotoProfile}>
            {userData.picture &&
                <img src={userData.picture}></img> ||
                <Prof1 className="w-12 h-12 mt-4" />
            }
        </div>
    )
}

const UserDpLoading = () => (
    <div className="w-12 h-12 rounded-[100%] border-[1px] border-green-400 overflow-hidden">
    </div>
)