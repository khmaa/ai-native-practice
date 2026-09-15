# 83일차 - 밀도 안내 표시 계약

- Density Guidance Display Contract는 density guidance 문장이 일관되게 만들어지는지 확인하는 설계다.
- AI UI에서 다음 관찰 행동을 안내하는 문장도 검증 가능한 계약 표면이 됨을 배웠다.
- `RecoverySourceSummaryContractDensityGuidanceDisplayInput` 타입을 추가했다.
- density guidance display example 타입과 예제를 추가했다.
- density guidance display formatter를 만들어 안내 문장 생성을 한 곳으로 모았다.
- policy health snapshot에 `contractDensityGuidanceDisplayContract`를 포함했다.
- contract group 목록에 `density-guidance-display` group을 추가했다.
- review order, inventory, safety, aggregate coverage 기대값을 12개 contract group 기준으로 갱신했다.
- State Machine 패널에 density guidance examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
