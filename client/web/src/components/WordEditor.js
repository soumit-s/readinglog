'use client'

import { useState } from "react"
import CollapsibleHead from "./CollapsibleHead"

export default function WordEditor({ content, words = [], onChange }) {
    const [inFocus, setFocus] = useState()
    const [collapsed, setCollapsed] = useState()

    return (
        <div className="editor-general">
            <CollapsibleHead onCollapse={_ => setCollapsed(true)} onUnCollapse={_ => setCollapsed(false)}>
                Words
            </CollapsibleHead>
            <div 
                className={
                    "bg-zinc-100 transition-all overflow-hidden h-full " + 
                    (
                        collapsed ? 'h-0' : 'h-40'
                    ) 
                }
                onClick={_ => setFocus(true)}
            >


                {inFocus && <textarea
                    onBlur={_ => setFocus(false) }
                    onChange={e => onChange && onChange(e)}
                    autoFocus
                    className="w-full min-h-full max-h-full resize-none p-4 outline-none bg-zinc-100"
                    defaultValue={content}
                ></textarea>}

                {!inFocus && <div className="flex flex-wrap gap-2 p-4 max-h-full overflow-y-auto">
                    {words.map((v, i) => (
                        <div key={i} className="bg-lime-900 px-2 p-1 rounded text-white">
                            {v}
                        </div>
                    ))}
                </div>}


            </div>
        </div>
    )
}