# 85일차 - 밀도 안내 근거 계약

- Density Guidance Rationale Contract는 density guidance의 근거 문장이 일관되게 만들어지는지 확인하는 설계다.
- 사용자가 행동 안내를 신뢰하려면 안내 자체뿐 아니라 왜 그래야 하는지도 검증 가능한 표면이어야 함을 배웠다.
- `RecoverySourceSummaryContractDensityGuidanceRationaleInput` 타입을 추가했다.
- density guidance rationale example 타입과 예제를 추가했다.
- density guidance rationale formatter를 만들어 근거 설명 생성을 한 곳으로 모았다.
- policy health snapshot에 `contractDensityGuidanceRationaleContract`를 포함했다.
- contract group 목록에 `density-guidance-rationale` group을 추가했다.
- review order, inventory, safety, aggregate coverage 기대값을 14개 contract group 기준으로 갱신했다.
- State Machine 패널에 density rationale examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
