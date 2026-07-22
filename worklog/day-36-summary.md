# 36일차 - 출처 표시 정책 ID

- Provenance Display Policy ID는 출처 요약 방식 자체를 식별 가능한 정책으로 남기는 설계다.
- 요약 결과뿐 아니라 어떤 표시 정책으로 만들어졌는지도 추적 가능해야 함을 배웠다.
- `RecoveryAttempt`에 `sourceIssueSummaryPolicyId` 필드를 추가했다.
- 복구 출처 요약 정책을 `recovery-source-summary-v1`로 정의했다.
- `summarizeRecoverySource()`가 policy id를 함께 반환하도록 확장했다.
- regenerate 복구와 edit-preview 복구 모두 같은 source summary policy id를 갖도록 했다.
- 복구 시도 생성 시 summary, limit, reason, truncated와 policy id를 함께 저장했다.
- State Machine 패널에서 `source policy`를 확인할 수 있게 했다.
- provenance 표시 방식이 나중에 바뀌어도 어떤 정책이 적용됐는지 비교 가능하게 했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
