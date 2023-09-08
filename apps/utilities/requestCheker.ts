type RequestCheckerType = { requireList: string[]; requestData: any };

export const requestChecker = ({ requireList, requestData }: RequestCheckerType) => {
	const emptyField: string[] = [];
	requireList.map((value: string) => {
		if (!requestData[value]) {
			emptyField.push(value);
		}
	});
	return emptyField.toString();
};
