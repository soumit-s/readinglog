'use client'

import { useState } from "react"
import Search1 from "@/svg/Search1"

export default function SearchBox({ placeholder='', ...props }) {
    const [isActive, setActive] = useState(false)
    return (
        <div className={(isActive && 'custom-txt-box-active' || '') + " custom-txt-box flex items-center gap-4 text-zinc-700"}
            {...props}
        >
            <Search1 className="w-4 h-" color="rgb(160, 160, 171)" />
            <input type="text" placeholder={placeholder} className="bg-transparent focus:outline-none flex-auto" onFocus={_ => setActive(true)} onBlur={_ => setActive(false)} />
        </div>
    )
}