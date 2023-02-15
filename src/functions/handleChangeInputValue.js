export const handleChangeInputValue = (inputRef, setError) => {
	if (inputRef.current.value.length) {
		setError(false);
	}
}