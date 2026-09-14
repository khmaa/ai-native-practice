# 82일차 - 밀도 안내 신호

- Density Guidance Signal은 contract density가 높을 때 어떤 순서로 진단을 읽을지 안내하는 설계다.
- AI UI는 상태를 보여주는 데서 멈추지 않고 다음 관찰 행동까지 제안해야 함을 배웠다.
- `RecoverySourceSummaryContractDensityGuidance` 타입을 추가했다.
- policy health snapshot에 `contractDensityGuidance`를 포함했다.
- density level이 `dense`이면 `use review order first` 안내를 만든다.
- dense guidance message는 개별 contract diagnostics 전에 review order를 먼저 읽으라고 설명한다.
- compact 상태에서는 직접 diagnostics를 훑어도 된다는 안내를 반환하도록 분기했다.
- State Machine 패널에 density guidance, detail, rationale을 표시했다.
- 기존 density display contract와 contract group 구성은 유지했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
