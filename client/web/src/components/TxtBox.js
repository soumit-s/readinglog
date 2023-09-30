export default function TxtBox({type='text', className='', ...props}) {
    return <input className={`custom-txt-box ${className}`} type={type} {...props}></input>
}