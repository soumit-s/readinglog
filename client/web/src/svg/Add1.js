import * as React from "react"
const Add1 = ({color = 'white', ...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <title />
    <g
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      data-name="add"
    >
      <path d="M12 19V5M5 12h14" />
    </g>
  </svg>
)
export default Add1
