export default function Loadable({isLoading, children, ...props}) {
    return (
        <div {...props}>
            {
                isLoading ? <b>Loading</b> : children
            }
        </div>
    )
}