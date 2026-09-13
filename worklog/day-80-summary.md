# 80일차 - 계약 밀도 신호

- Contract Density Signal은 contract group이 많아졌을 때 진단 패널의 읽기 밀도를 알려주는 설계다.
- 계약이 늘어날수록 pass/fail뿐 아니라 정보량 자체도 사용자가 관찰해야 할 상태가 됨을 배웠다.
- `RecoverySourceSummaryContractDensityLevel` 타입을 추가했다.
- `RecoverySourceSummaryContractDensity` 타입을 추가했다.
- policy health snapshot에 `contractDensity`를 포함했다.
- contract group 수가 10개 이상이면 density level을 `dense`로 계산한다.
- density display text는 `dense · 10 contract group(s)` 형태로 표시된다.
- density rationale은 더 강한 읽기 보조 신호가 필요한 시점을 설명한다.
- State Machine 패널에 contract density와 rationale을 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
