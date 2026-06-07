export type PlannerStatus = "idle" | "generating" | "ready" | "error";

export type TaskSuggestion = {
  id: string;
  title: string;
  detail: string;
  day: string;
  duration: string;
  selected: boolean;
};

export type ApprovedTask = Omit<TaskSuggestion, "selected">;

export type TaskSuggestionPatch = Partial<TaskSuggestion>;

export type PlannerIssue = {
  title: string;
  message: string;
  recovery: string;
};
