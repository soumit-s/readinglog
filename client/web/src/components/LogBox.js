import CollapsibleHead from "./CollapsibleHead";


export default function LogBox({onChange, defaultValue, ...props}) {
    return (
        <div className="editor-general h-full" {...props}>
            <div>
                <CollapsibleHead>
                Log
                </CollapsibleHead>
            </div>
            <div className="h-full">
                <textarea 
                    defaultValue={defaultValue}
                    className="w-full h-full resize-none outline-none bg-zinc-100 p-4 text-zinc-700" 
                    onChange={(e) => onChange && onChange(e)}
                />
            </div>
        </div>
    )
}