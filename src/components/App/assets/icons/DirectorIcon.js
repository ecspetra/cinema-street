import React from "react";

const DirectorIcon = (props) => (
  <svg className='director-icon' xmlns="http://www.w3.org/2000/svg" width={18} height={21} viewBox="0 0 18 21" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M-3-2h24v24H-3z" />
      <path
        fill="#a7a2b4"
        d="M16 0H2a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4l2.29 2.29c.39.39 1.02.39 1.41 0L12 18h4c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM9 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7ZM15 14H3v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9Z"
      />
    </g>
  </svg>
)

export default DirectorIcon;
