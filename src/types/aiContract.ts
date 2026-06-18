export type PlanRequest = {
  prompt: string;
  maxTasks: number;
  locale: "ko";
  context: PlanContext;
  feedback?: PlanFeedback;
};

export type PlanContext = {
  approvedTaskTitles: string[];
  draftTaskTitles: string[];
  taskTitleBudget: number;
  omittedTaskTitleCount: number;
  blockedTaskTitleCount: number;
};

export type PlanTaskDraft = {
  title: string;
  detail: string;
  day: string;
  duration: string;
};

export type PlanResponse = {
  tasks: PlanTaskDraft[];
};

export type PlanValidationResult =
  | {
      ok: true;
      data: PlanResponse;
    }
  | {
      ok: false;
      category: PlanValidationFailureCategory;
      message: string;
    };

export type PlanValidationFailureCategory = "schema" | "semantic";

export type PlanFeedback = {
  validationCategory: PlanValidationFailureCategory;
  validationMessage: string;
};
