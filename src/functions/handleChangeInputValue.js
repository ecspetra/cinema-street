export const handleChangeInputValue = (inputRef, setIsShowError) => {
	if (inputRef.current.value.length) {
		setIsShowError(false);
	}
}