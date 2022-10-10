import * as React from "react"

const RatingIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 32 32"
        style={{
            enableBackground: "new 0 0 32 32",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <path d="M29.3 12.7c-.1-.4-.5-.7-1-.7h-8.7L17 3.7c-.1-.4-.5-.7-1-.7s-.8.3-1 .7L12.4 12H3.7c-.4 0-.8.3-1 .7-.1.4 0 .9.4 1.1l7 5.1-2.7 8.3c-.1.4 0 .9.4 1.1.4.3.8.3 1.2 0l7-5.1 7 5.1c.2.1.4.2.6.2s.4-.1.6-.2c.4-.3.5-.7.4-1.1l-2.7-8.3 7-5.1c.3-.2.5-.7.4-1.1z" />
    </svg>
)

export default RatingIcon;
