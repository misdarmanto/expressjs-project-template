import { CONFIG } from "../configs";
import { CONSOLE } from "./log";

export interface ResponseDataAttributes {
	request_param: any | null;
	status: string;
	error_message: any | null;
	data: any;
	next: any | null;
	version: any | Object | null;
}
export const ResponseData = {
	error: (message?: any) => {
		CONSOLE.error(message);

		return <ResponseDataAttributes>{
			request_param: "",
			status: "error",
			error_message: message,
			data: null,
			next: "",
			version: { code: CONFIG.appVersion, name: CONFIG.appSemantic },
		};
	},
	default: <ResponseDataAttributes>{
		request_param: "",
		status: "success",
		error_message: null,
		data: "",
		next: "",
		version: { code: CONFIG.appVersion, name: CONFIG.appSemantic },
	},
};
