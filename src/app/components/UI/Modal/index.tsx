import React, { useEffect, useRef, useState } from 'react'
import Portal from '../Portal/index'
import { useModal } from '@/context/ModalProvider'
import Alert from '@/app/components/UI/Alert'
import { CSSTransition } from 'react-transition-group'
import ModalContent from '@/app/components/UI/Modal/ModalContent'

const Modal = () => {
	const modalRef = useRef(null)
	const timeoutRef = useRef(null)
	const { hideModal, isMounted, currentModal } = useModal()

	const { id, modalText, alertInfo } = currentModal || {}

	const handleClose = () => {
		hideModal(id)
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}

	useEffect(() => {
		const handleClickOutside = event => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				hideModal(id)
			}
		}

		if (!alertInfo?.isAlert) {
			document.addEventListener('click', handleClickOutside)
		} else {
			timeoutRef.current = setTimeout(() => {
				hideModal(id)
			}, 4500)
		}

		return () => {
			if (!alertInfo?.isAlert) {
				document.removeEventListener('click', handleClickOutside)
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [modalRef, alertInfo?.isAlert, id, hideModal])

	if (!currentModal) return null

	return (
		<Portal wrapperId='modal-root' isAlert={alertInfo?.isAlert}>
			<CSSTransition
				in={isMounted}
				timeout={300}
				appear={true}
				classNames='modal'
			>
				{alertInfo?.isAlert ? (
					<Alert modalText={modalText} type={alertInfo?.type} />
				) : (
					<ModalContent
						currentModal={currentModal}
						onClose={handleClose}
						modalRef={modalRef}
					/>
				)}
			</CSSTransition>
		</Portal>
	)
}

export default Modal
