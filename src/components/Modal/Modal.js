import { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

const Modal = (props) => {

	const { children, onClickFunction, className, overflow = 'hidden' } = props;

	useEffect(() => {

		if (overflow === 'hidden') {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			if (overflow === 'hidden') {
				document.body.style.overflow = 'unset';
			}
		}
	}, []);

	return (
		<>
			{ReactDOM.createPortal(
				<div className={classNames(className, 'modal')} onClick={onClickFunction}>{children}</div>,
				document.getElementById("modal-root")
			)}
		</>
	);
}

export default Modal;
