import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import './assets/index.scss';
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {

	const { isShowModal, children, onClickFunction, className, overflow = 'hidden' } = props;

	const [isMounted, setIsMounted] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {

		if (isShowModal === true) {
			if (overflow === 'hidden') {
				document.body.style.overflow = 'hidden';
			}
			setIsModalVisible(true);
			setIsMounted(true);
		} else {
			if (overflow === 'hidden') {
				document.body.style.overflow = 'unset';
			}
			setIsMounted(false);
			setTimeout(() => {
				setIsModalVisible(false);
			}, 750)
		}

	}, [isShowModal]);

	return (
		<>
			{
				isModalVisible === true ? (
					ReactDOM.createPortal(
						<CSSTransition
							in={isMounted}
							appear={true}
							timeout={0}
							classNames="modal"
						>
							<div className={classNames(className, 'modal')} onClick={onClickFunction}>{children}</div>
						</CSSTransition>, document.getElementById("modal-root")
					)
				) : null
			}
		</>
	);
}

export default Modal;
