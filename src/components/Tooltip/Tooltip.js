import React, {useEffect, useState} from "react";
import './assets/index.scss';
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

const Tooltip = (props) => {

	const { isShowTooltip, children, className, title, description } = props;
	const [isMounted, setIsMounted] = useState(false);
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	useEffect(() => {

		if (isShowTooltip === true) {
			setIsTooltipVisible(true);
			setIsMounted(true);
		} else {
			setIsMounted(false);
			setTimeout(() => {
				setIsTooltipVisible(false);
			}, 1000)
		}

	}, [isShowTooltip]);

	return (
		<>
			{
				isTooltipVisible === true ? (
					<CSSTransition
						in={isMounted}
						appear={true}
						timeout={0}
						classNames="tooltip-wrap"
					>
						<div className={classNames('tooltip', className)}>
							{children}
							{title && <h3 className="tooltip__title">{title}</h3>}
							{description && <p className="tooltip__description">{description}</p>}
						</div>
					</CSSTransition>
				) : null
			}
		</>
	);
}

export default Tooltip;