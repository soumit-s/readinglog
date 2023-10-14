import Add1 from "@/svg/Add1";
import Delete1 from "@/svg/Delete1";
import Filter1 from "@/svg/Filter1";

import { PiTrash, PiFunnel, PiSelectionAll } from 'react-icons/pi'

export default function ActionBar({ onNew, onDelete, onSelectAll, ...props }) {
    return (
        <div {...props} className="flex items-center justify-between">
            <div>
                <button className="ok-button px-[0.7rem] flex items-center gap-[0.5em]" onClick={e => onNew && onNew(e)}>
                    <Add1 className="w-6 h-6" />
                    <span>New</span>
                </button>
            </div>
            <div className="flex bg-white text-gray-700 rounded border-[1px] border-zinc-300 overflow-hidden">
                <Action onClick={e => onSelectAll && onSelectAll(e)}>
                    <PiSelectionAll className="text-xl" />
                </Action>
                <div className="flex-auto border-l-[1px] border-zinc-300"></div>
                <Action onClick={e => onDelete && onDelete(e)}>
                    <PiTrash className="text-xl" />
                </Action>
                <div className="flex-auto border-l-[1px] border-zinc-300"></div>
                <Action>
                    <PiFunnel className="text-xl" />
                </Action>
            </div>
        </div>
    )
}

function Action({ children, ...props }) {
    return <button {...props} className="p-2 hover:bg-zinc-100">{children}</button>
}