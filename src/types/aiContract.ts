export type PlanRequest = {
  prompt: string;
  maxTasks: number;
  locale: "ko";
  context: PlanContext;
};

export type PlanContext = {
  approvedTaskTitles: string[];
  draftTaskTitles: string[];
  taskTitleBudget: number;
  omittedTaskTitleCount: number;
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
      message: string;
    };
