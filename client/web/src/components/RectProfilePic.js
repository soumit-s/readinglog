import Prof1 from "@/svg/Prof1"

export default function RectProfilePic({ picture, isLoading }) {
    return (
        <div className="w-12 h-12 md:w-32 md:h-32 rounded-lg border-[1px] border-zinc-400 overflow-hidden flex items-center justify-center bg-emerald-100 cursor-pointer">
            {!isLoading && picture &&
                <img src={picture}></img> ||
                <Prof1 className="w-12 h-12 md:w-48 md:h-48 mt-12" />
            }
        </div>
    )
}