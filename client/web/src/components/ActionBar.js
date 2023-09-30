import Add1 from "@/svg/Add1";
import Delete1 from "@/svg/Delete1";
import Filter1 from "@/svg/Filter1";

export default function ActionBar({...props}) {
    return (
        <div {...props} className="flex items-center justify-between">
            <div>
                <button className="ok-button px-[0.7rem] flex items-center gap-[0.5em]">
                    <Add1 className="w-6 h-6" />
                    <span>New</span>
                </button>
            </div>
            <div className="flex bg-white rounded border-[1px] border-zinc-300 overflow-hidden">
                <Action>
                    <Delete1 className="w-6 h-6" color='#222'/>
                </Action>
                <div className="flex-auto border-l-[1px] border-zinc-300"></div>
                <Action>
                    <Filter1 className="w-6 h-6" color='#222'/>
                </Action>
            </div>
        </div>
    )
}

function Action({children}) {
    return <button className="p-2 hover:bg-zinc-100">{children}</button>
}