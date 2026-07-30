# 41일차 - 실행 가능한 정책 예제

- Executable Policy Examples는 계약 예제를 실제 정책 함수 결과와 비교할 수 있게 만드는 설계다.
- 예제가 문서에 머물지 않고 살아있는 계약이 되어야 함을 배웠다.
- `RecoverySourceSummaryContractCheck` 타입을 추가했다.
- `checkRecoverySourceSummaryContractExamples()` helper를 추가했다.
- 각 contract example의 input을 실제 `summarizeRecoverySource()`에 넣어 결과를 계산하게 했다.
- actual과 expected의 text, truncated 여부, policy id, limit, reason을 비교했다.
- 비교 결과를 example name과 passed 값으로 반환하도록 했다.
- State Machine 패널에서 passing example 개수를 표시하게 했다.
- 정책 예제 상태가 `2/2 passing`처럼 관찰 가능한 UI 정보가 됐다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
