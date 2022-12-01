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
                            viewBox="0 0 21 20"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            {...props}
                        >
                                <path
                                    d="M0 20h4.2V8H0v12Zm20.924-8.645-1.823 6.535c-.302 1.241-1.462 2.11-2.799 2.11H6.3V8.021l1.805-6.196C8.274.775 9.223 0 10.339 0 11.588 0 12.6.964 12.6 2.153V8h5.526c1.847 0 3.214 1.641 2.798 3.355Z"
                                    fillRule="evenodd"
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
                    viewBox="0 0 21 20"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    {...props}
                >
                        <path
                            d="M21 0h-4.2v12H21V0ZM.074 8.645 1.899 2.11C2.2.869 3.36 0 4.697 0h10.002v11.979l-1.805 6.196C12.725 19.225 11.776 20 10.66 20c-1.248 0-2.26-.964-2.26-2.153V12H2.872C1.026 12-.34 10.359.075 8.645Z"
                            fillRule="evenodd"
                        />
                </svg>)
        }

        const resultReactionIcon = reactionIconType(props);

        return resultReactionIcon;
}

export default ReactionIcon;
