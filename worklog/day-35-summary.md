# 35일차 - 출처 예산 이유

- Provenance Budget Rationale은 출처 표시 예산이 왜 선택됐는지 함께 드러내는 설계다.
- 제한값은 숨은 구현 숫자가 아니라 설명 가능한 UI 계약이어야 함을 배웠다.
- `RecoveryAttempt`에 `sourceIssueSummaryReason` 필드를 추가했다.
- 복구 출처 요약 이유를 `recoverySourceSummaryReason` 상수로 분리했다.
- 요약 이유를 “state panel 안에서 복구 출처를 빠르게 훑기 위한 제한”으로 정의했다.
- `summarizeRecoverySource()`가 text, limit, reason, truncated를 함께 반환하도록 확장했다.
- regenerate 복구와 edit-preview 복구 모두 같은 budget rationale을 갖도록 했다.
- State Machine 패널에서 `budget reason`을 확인할 수 있게 했다.
- provenance 표시 숫자와 그 이유를 함께 관찰 가능한 상태로 만들었다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
