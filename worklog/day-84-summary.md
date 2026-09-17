# 84일차 - 밀도 안내 상세 계약

- Density Guidance Detail Contract는 density guidance의 상세 설명 문장이 일관되게 만들어지는지 확인하는 설계다.
- 짧은 안내 문장뿐 아니라 사용자가 행동 이유를 이해하는 상세 설명도 계약 대상임을 배웠다.
- `RecoverySourceSummaryContractDensityGuidanceDetailInput` 타입을 추가했다.
- density guidance detail example 타입과 예제를 추가했다.
- density guidance detail formatter를 만들어 상세 설명 생성을 한 곳으로 모았다.
- policy health snapshot에 `contractDensityGuidanceDetailContract`를 포함했다.
- contract group 목록에 `density-guidance-detail` group을 추가했다.
- review order, inventory, safety, aggregate coverage 기대값을 13개 contract group 기준으로 갱신했다.
- State Machine 패널에 density detail examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
