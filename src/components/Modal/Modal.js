import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

const Modal = (props) => {

	const modalRoot = document.getElementById('modal-root');

	const { children, onClick } = props;

	const container = useRef(document.createElement('div'));
	container.current.classList.add('modal');

	useEffect(() => {
		modalRoot.appendChild(container.current);
		modalRoot.addEventListener('click', onClick);
		document.body.style.overflow = 'hidden';
		return () => {
			modalRoot.removeChild(container.current);
			modalRoot.removeEventListener('click', onClick);
			document.body.style.overflow = 'unset';
		}
	}, []);

	return createPortal(children, container.current);
}

export default Modal;
