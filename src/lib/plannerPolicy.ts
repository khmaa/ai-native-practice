export const allowedPlanDays = ["월", "화", "수", "목", "금", "주말"] as const;

const allowedPlanDaySet = new Set<string>(allowedPlanDays);

export function isAllowedPlanDay(day: string) {
  return allowedPlanDaySet.has(day);
}

export function formatAllowedPlanDays() {
  return allowedPlanDays.join("/");
}

export function isPlanDuration(duration: string) {
  return /^\d+m$/.test(duration);
}

export function normalizeTaskTitle(title: string) {
  return title.trim().toLocaleLowerCase("ko");
}
