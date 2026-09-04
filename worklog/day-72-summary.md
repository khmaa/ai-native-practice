# 72일차 - 목록 안전 신호

- Inventory Safety Guard는 contract inventory가 latest group을 읽기 전에 목록이 비어 있지 않은지 확인하는 설계다.
- AI UI에서 표시값의 신뢰는 값 자체뿐 아니라 값을 읽는 전제 조건에서도 나온다는 점을 배웠다.
- `RecoverySourceSummaryContractInventorySafetyStatus` 타입을 추가했다.
- `RecoverySourceSummaryContractInventorySafety` 타입을 추가했다.
- policy health snapshot에 `contractInventorySafety`를 포함했다.
- contract group 목록의 non-empty 상태를 `safe` 또는 `empty`로 표현하게 했다.
- inventory safety display text는 `safe · 6 group(s) available` 형태로 표시된다.
- latest group 접근은 명시적인 guard 함수를 거치도록 정리했다.
- State Machine 패널에 inventory safety와 rationale을 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
