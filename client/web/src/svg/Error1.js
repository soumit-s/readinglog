import * as React from "react"
const SvgComponent = ({color="red", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      stroke={color}
      strokeWidth={1.2}
      d="M12.5 16v-1.5m0-5.5v4m8-.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
    />
  </svg>
)
export default SvgComponent
