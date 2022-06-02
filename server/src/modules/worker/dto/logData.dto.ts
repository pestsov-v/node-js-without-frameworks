import { ICheckOutcomeDto } from "./checkOutcome.dto";
import { IOriginalCheckData } from "./originalCheckData.dto"

export interface ILogDataDto {
	check: IOriginalCheckData;
	outcome: ICheckOutcomeDto;
	state: string;
	alert: string;
	timeOfCheck: Date
}