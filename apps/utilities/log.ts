import { CONFIG } from "../configs";

export const CONSOLE = {
	log: function (message?: any, ...optionalParams: any[]): void {
		CONFIG.log && console.log(message, ...optionalParams);
	},
	info: function (message?: any, ...optionalParams: any[]) {
		CONFIG.log && console.info(message, ...optionalParams);
	},
	warn: function (message?: any, ...optionalParams: any[]) {
		CONFIG.log && console.warn(message, ...optionalParams);
	},
	error: function (message?: any, ...optionalParams: any[]) {
		CONFIG.log && console.error(message, ...optionalParams);
	},
	table: function (tabularData: any, properties?: readonly string[] | undefined): void {
		CONFIG.log && console.table(tabularData, properties);
	},
};
