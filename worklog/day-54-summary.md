# 54일차 - 계약 상태 이유

- Contract Summary Status Reason은 계약 요약 상태가 왜 그렇게 판단됐는지 짧게 설명하는 설계다.
- `passing` 또는 `failing` 라벨만으로는 판단 근거가 충분히 드러나지 않음을 배웠다.
- `RecoverySourceSummaryContractCheckSummary`에 `statusReason` 필드를 추가했다.
- 모든 contract summary helper가 status reason을 함께 반환하게 했다.
- 모든 예제가 통과하면 `all contract examples passed` reason을 사용한다.
- 실패 예제가 있으면 실패한 example 수를 reason에 포함한다.
- recovery source summary contract에 status reason을 추가했다.
- guidance display contract와 aggregate summary에도 같은 reason 규칙을 적용했다.
- State Machine 패널에 aggregate, guidance display, policy examples reason을 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
