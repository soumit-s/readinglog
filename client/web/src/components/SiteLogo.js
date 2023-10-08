import { BsBookmarkFill as LogLogo} from "react-icons/bs"

export default function SiteLogo ({className, ...props}) {
    return (
        <span className={className + " font-bold flex items-center gap-[1em]"} {...props}>
            <LogLogo className="text-[1em]"/>
            Reading Log
        </span>
    )
}