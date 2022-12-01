import * as React from "react"

const ReplyIcon = (props) => {
        return (
                <svg
                    className="reply-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                            enableBackground: "new 0 0 32 32",
                    }}
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    {...props}
                >
                        <path d="M28 16c-1.219 0-1.797.859-2 1.766C25.269 21.03 22.167 26 16 26c-5.523 0-10-4.478-10-10S10.477 6 16 6c2.24 0 4.295.753 5.96 2H20a2 2 0 0 0 0 4h6a2 2 0 0 0 2-2V4a2 2 0 0 0-4 0v.518A13.904 13.904 0 0 0 16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c9.979 0 14-9.5 14-11.875C30 16.672 28.938 16 28 16z" />
                </svg>
        );
}

export default ReplyIcon;
