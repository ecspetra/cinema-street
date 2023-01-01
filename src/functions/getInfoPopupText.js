export const getInfoPopupText = (action, isItemFromCollection, successText, errorText = 'Something went wrong') => {

	let result = {
		resultText: '',
		isActionCompletedSuccessfully: false,
	}

	if (action === 'add') {
		if (isItemFromCollection === true) {
			result = {
				resultText: successText,
				isActionCompletedSuccessfully: true,
			}
			return result;
		} else {
			result = {
				resultText: errorText,
				isActionCompletedSuccessfully: false,
			}
			return result;
		}
	} else if (action === 'remove') {
		if (isItemFromCollection === false) {
			result = {
				resultText: successText,
				isActionCompletedSuccessfully: true,
			}
			return result;
		} else {
			result = {
				resultText: errorText,
				isActionCompletedSuccessfully: false,
			}
			return result;
		}
	}
}