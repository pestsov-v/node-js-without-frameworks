import { message } from "../constants/message.constants";

export interface getCommandsDescriptionResponse {
	exit: message;
	man: message;
	help: message;
	stats: message;  
	["List users"]: message;      
	["More user info --{userId}"]: message;
    ["List checks --up --down"]: message;
    ["More check info --{checkId}"]: message;
    ["List logs"]: message;
	["More log info --{logFileName}"]: message,
}