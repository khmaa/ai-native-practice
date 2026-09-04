# 71일차 - 목록 표시 계약

- Inventory Display Contract는 contract inventory 문장이 일관되게 만들어지는지 확인하는 설계다.
- AI UI에서 작은 표시 문자열도 사용자가 신뢰 상태를 읽는 단서가 됨을 배웠다.
- `RecoverySourceSummaryContractInventoryDisplayInput` 타입을 추가했다.
- inventory display example 타입과 예제를 추가했다.
- inventory display formatter를 예제 기반 계약으로 검증하도록 구성했다.
- policy health snapshot에 `contractInventoryDisplayContract`를 포함했다.
- contract group 목록에 `inventory-display` group을 추가했다.
- 현재 inventory는 6개 contract group과 최신 group id를 표시한다.
- State Machine 패널에 inventory display examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
