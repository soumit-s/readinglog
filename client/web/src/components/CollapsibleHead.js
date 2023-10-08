import Collapsible from "./Collapsible";

export default function CollapsibleHead({className="collapsible-head", onCollapse, onUnCollapse, children, ...props}) {
    return (
        <div className={className} {...props}>
            <Collapsible onCollapse={onCollapse} onUnCollapse={onUnCollapse}/>
            {children}
        </div>
    )
}