const Utils = {
	isValid(word) {
		let isValid = true;
		if (typeof word !== 'string') {
			isValid = false;
		}
		if (word.length === 0) {
			isValid = false;
		}
		if (word.length > 10) {
			isValid = false;
		}
		return isValid;
	},
};

export default Utils;
