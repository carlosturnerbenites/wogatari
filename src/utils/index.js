const Utils = {
	isValid(word) {
		let isValid = false;
		if (typeof word === 'string') {
			isValid = true;
		}
		if (word === '') {
			isValid = false;
		}
		return isValid;
	},
};

export default Utils;
