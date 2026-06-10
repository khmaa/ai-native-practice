import type { PlannerIssue, PlannerStatus } from "../types/planner";

export type PlannerStateView = {
  label: string;
  description: string;
  allowedAction: string;
};

export function getPlannerStateView({
  status,
  hasDraft,
  issue,
}: {
  status: PlannerStatus;
  hasDraft: boolean;
  issue: PlannerIssue | null;
}): PlannerStateView {
  if (status === "generating") {
    return {
      label: "Generating",
      description: hasDraft ? "새 초안을 요청하는 동안 마지막 유효 초안을 보존합니다." : "AI draft를 요청하고 검증하는 중입니다.",
      allowedAction: "취소할 수 있고, 완료 전에는 적용할 수 없습니다.",
    };
  }

  if (status === "error" || issue) {
    return {
      label: "Recoverable error",
      description: "AI 응답이 계약을 통과하지 못해 앱 상태로 승격하지 않았습니다.",
      allowedAction: hasDraft ? "마지막 유효 초안을 유지한 채 다시 생성할 수 있습니다." : "요청을 수정하거나 다시 생성할 수 있습니다.",
    };
  }

  if (status === "ready" && hasDraft) {
    return {
      label: "Ready for review",
      description: "검증된 AI draft가 preview 상태에 머물러 있습니다.",
      allowedAction: "수정, 선택, 재생성, 적용을 할 수 있습니다.",
    };
  }

  return {
    label: "Idle",
    description: "아직 검토할 AI draft가 없습니다.",
    allowedAction: "사용자 의도를 입력하고 생성을 시작할 수 있습니다.",
  };
}
