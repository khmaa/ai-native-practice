# 37일차 - 출처 표시 정책 스냅샷

- Provenance Display Policy Snapshot은 출처 표시 정책 값을 하나의 묶음으로 남기는 설계다.
- policy id, limit, reason을 낱개 필드로 복사하면 같은 정책에서 나온 값인지 흐려질 수 있음을 배웠다.
- `RecoverySourceSummaryPolicySnapshot` 타입을 추가했다.
- `RecoveryAttempt`의 source summary policy id, limit, reason 필드를 하나의 snapshot으로 정리했다.
- 복구 출처 요약 정책을 `recoverySourceSummaryPolicy` 객체로 묶었다.
- `summarizeRecoverySource()`가 policy snapshot을 함께 반환하도록 바꿨다.
- 복구 시도 생성 시 source summary policy snapshot을 저장하도록 했다.
- State Machine 패널이 snapshot에서 id, limit, reason을 읽도록 수정했다.
- provenance summary가 어떤 정책 묶음으로 만들어졌는지 더 안정적으로 추적 가능해졌다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
