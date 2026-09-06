# 73일차 - 안전 표시 계약

- Inventory Safety Display Contract는 inventory safety 문장이 일관되게 만들어지는지 확인하는 설계다.
- 가드의 결과도 UI에 보이는 순간 사용자가 신뢰 상태를 읽는 계약 대상이 됨을 배웠다.
- `RecoverySourceSummaryContractInventorySafetyDisplayInput` 타입을 추가했다.
- inventory safety display example 타입과 예제를 추가했다.
- safety status와 group count를 display text로 바꾸는 formatter를 계약으로 검증했다.
- policy health snapshot에 `contractInventorySafetyDisplayContract`를 포함했다.
- contract group 목록에 `inventory-safety-display` group을 추가했다.
- 현재 inventory와 aggregate coverage는 7개 contract group 기준으로 갱신됐다.
- State Machine 패널에 safety display examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
