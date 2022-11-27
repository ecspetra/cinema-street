import * as React from "react"

const ReactionIcon = (props) => {

        const reactionIconType = (props) => {

                const { isLike, ...rest } = props;

                if (isLike) {
                        return (<svg
                            className="reaction-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            id="Icons"
                            x={0}
                            y={0}
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            {...props}
                        >
                                <path
                                    d="M11 24V14H5v12h6v-2.4 0c1.5 1.6 4.1 2.4 6.2 2.4h6.5c1.1 0 2.1-.8 2.3-2l1.5-8.6c.3-1.5-.9-2.4-2.3-2.4H20V6.4C20 5.1 18.7 4 17.4 4v0C16.1 4 15 5.1 15 6.4v0c0 1.6-.5 3.1-1.4 4.4l-2.6 3"
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                />
                        </svg>)
                } else return (<svg
                    className="reaction-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Icons"
                    x={0}
                    y={0}
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    {...props}
                >
                        <path
                            d="M21.546 6v10h6V4h-6v2.4h0c-1.5-1.6-4.1-2.4-6.2-2.4h-6.5c-1.1 0-2.1.8-2.3 2l-1.5 8.6c-.3 1.5.9 2.4 2.3 2.4h5.2v6.6c0 1.3 1.3 2.4 2.6 2.4h0c1.3 0 2.4-1.1 2.4-2.4h0c0-1.6.5-3.1 1.4-4.4l2.6-3"
                            fill="none"
                            stroke="#000"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                        />
                </svg>)
        }

        const resultReactionIcon = reactionIconType(props);

        return resultReactionIcon;
}

export default ReactionIcon;
