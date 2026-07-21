# 34일차 - 출처 표시 예산

- Provenance Display Budget은 출처 요약을 어떤 길이 제한으로 보여주는지 명시하는 설계다.
- 요약 여부뿐 아니라 요약 기준 숫자도 UI 계약의 일부임을 배웠다.
- `RecoveryAttempt`에 `sourceIssueSummaryLimit` 필드를 추가했다.
- 복구 출처 요약 길이 기준을 `recoverySourceSummaryLimit` 상수로 분리했다.
- 기존 96자 제한을 숨은 숫자가 아니라 명시적 표시 예산으로 바꿨다.
- `summarizeRecoverySource()`가 text, truncated, limit을 함께 반환하도록 정리했다.
- 긴 source issue message는 limit에서 ellipsis 길이를 뺀 만큼 잘리도록 했다.
- 복구 시도 생성 시 summary limit을 함께 저장했다.
- State Machine 패널에서 `source budget: 96 chars`를 확인할 수 있게 했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
