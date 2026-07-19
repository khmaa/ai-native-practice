# 32일차 - 제한된 복구 출처

- Bounded Recovery Provenance는 복구 출처를 남기되 UI에는 필요한 만큼만 요약해 보여주는 설계다.
- provenance를 많이 보여주는 것이 항상 좋은 관찰 가능성은 아님을 배웠다.
- `RecoveryAttempt`에 `sourceIssueSummary` 필드를 추가했다.
- 복구 시도 생성 시 source issue message를 정규화해 요약하도록 했다.
- `summarizeRecoverySource()` helper를 추가했다.
- source issue message가 96자 이하이면 그대로 summary로 사용하도록 했다.
- source issue message가 길면 96자 이내로 줄여 표시하도록 했다.
- State Machine 패널에서 full source message 대신 source summary를 표시하게 했다.
- 원문 출처 snapshot은 상태에 남기고, UI 표면은 bounded summary로 제한했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
