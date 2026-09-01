# 68일차 - 계약 합산 범위

- Contract Aggregate Coverage는 policy health aggregate가 몇 개의 contract group을 포함하는지 명시하는 설계다.
- aggregate 결과만 보면 어떤 범위의 계약을 합산했는지 사용자가 추론해야 함을 배웠다.
- `RecoverySourceSummaryContractAggregateCoverage` 타입을 추가했다.
- policy health snapshot이 `contractAggregateCoverage`를 함께 포함하도록 확장했다.
- coverage는 포함된 contract group 수를 계산한다.
- 현재 coverage는 4개 contract group을 포함한다.
- coverage display text는 `4 contract group(s) covered` 형태로 표시된다.
- coverage rationale은 aggregate 범위를 설명한다.
- State Machine 패널에 aggregate coverage와 rationale을 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
