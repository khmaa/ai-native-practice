# 81일차 - 밀도 표시 계약

- Contract Density Display Contract는 contract density 문장이 일관되게 만들어지는지 확인하는 설계다.
- AI UI에서 정보량을 알려주는 신호도 사용자에게 보이는 순간 계약 대상이 됨을 배웠다.
- `RecoverySourceSummaryContractDensityDisplayInput` 타입을 추가했다.
- density display example 타입과 예제를 추가했다.
- density display formatter를 예제 기반 계약으로 검증했다.
- policy health snapshot에 `contractDensityDisplayContract`를 포함했다.
- contract group 목록에 `density-display` group을 추가했다.
- review order, inventory, safety, aggregate coverage 기대값을 11개 contract group 기준으로 갱신했다.
- State Machine 패널에 density examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
