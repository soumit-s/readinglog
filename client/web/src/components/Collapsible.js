'use client'

import Add1 from "@/svg/Add1"
import Minus1 from "@/svg/Minus1"
import { useEffect, useState } from "react"

export default function Collapsible({collapsed = false, onCollapse, onUnCollapse, ...props}) {
    const [isCollapsed, setCollapsed] = useState(collapsed)

    useEffect(() => {
        if (isCollapsed && onCollapse) {
            onCollapse()
        } else if (onUnCollapse) {
            onUnCollapse()
        }
    }, [isCollapsed])

    return (
        <button onClick={_ => setCollapsed(!isCollapsed)} className="rounded-full border-[1px] border-zinc-400 bg-zinc-100" {...props}>
            {isCollapsed ? <Add1 className="w-4 h-4" color="#777" /> : <Minus1 className="w-4 h-4" color="#777" />}
        </button>
    )
}