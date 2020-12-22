export interface Step {
	_id: string;
	description: string;
	cover: string;
}

export interface StepExport extends Omit<Step, '_id'> {
	number: number;
}

export type StepUI = {
	_id: string;
	description: string;
	cover: string;
	nameStep: string;
	canDeleteIt: boolean;
};
