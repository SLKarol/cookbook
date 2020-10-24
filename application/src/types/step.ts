export type Step = {
  id: string;
  description: string;
  cover: string;
};

export type StepExport = Omit<Step, "id">;
