# 53일차 - 계약 요약 상태

- Contract Summary Status는 계약 체크 요약을 `passing` 또는 `failing` 상태로 해석하는 설계다.
- `2/2 passing` 같은 숫자만으로는 사용자가 상태를 다시 계산해야 함을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryStatus` 타입을 추가했다.
- contract check summary가 `status` 필드를 함께 포함하도록 확장했다.
- 모든 example이 통과하면 `passing` 상태가 되도록 했다.
- 하나라도 실패하면 `failing` 상태가 되도록 했다.
- recovery source summary contract summary에 status를 추가했다.
- guidance display contract summary와 aggregate summary에도 같은 status 규칙을 적용했다.
- State Machine 패널은 각 contract summary의 status와 display text를 함께 표시한다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
