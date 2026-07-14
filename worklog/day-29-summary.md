# 29일차 - 복구 시도 피드백

- Recovery Attempt Feedback은 사용자가 복구 행동을 시작했음을 앱 상태로 보여주는 설계다.
- 복구 UX가 안내 문구에서 끝나지 않고 진행 중인 흐름으로 느껴져야 함을 배웠다.
- `RecoveryAction`과 `RecoveryAttempt` 타입을 추가했다.
- `PlannerIssue.recommendedAction`이 공통 `RecoveryAction` 타입을 사용하도록 정리했다.
- regenerate 복구 행동을 시작하면 최근 복구 시도로 기록되게 했다.
- edit-preview 복구 행동을 시작하면 오류를 닫고 preview 수정 흐름으로 기록되게 했다.
- 복구 재생성이 성공하면 새 preview draft가 준비됐다는 완료 피드백을 표시했다.
- State Machine 패널에서 최근 복구 시도와 source rule을 확인할 수 있게 했다.
- 복구 피드백 UI 스타일을 추가해 기존 오류 상태와 구분했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
