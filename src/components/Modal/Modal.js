import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

const Modal = (props) => {

	const modalRoot = document.getElementById('modal-root');

	const { children, onClick, className } = props;

	const container = useRef(document.createElement('div'));
	container.current.classList.add('modal');

	if (className) {
		container.current.classList.add(className);
	}

	useEffect(() => {
		modalRoot.appendChild(container.current);
		modalRoot.addEventListener('click', onClick);

		if (container.current.classList.length === 1) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			modalRoot.removeChild(container.current);
			modalRoot.removeEventListener('click', onClick);

			if (container.current.classList.length === 1) {
				document.body.style.overflow = 'unset';
			}
		}
	}, []);

	return createPortal(children, container.current);
}

export default Modal;
