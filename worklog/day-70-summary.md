# 70일차 - 계약 목록 신호

- Contract Inventory Signal은 늘어나는 contract group 목록을 사용자가 빠르게 파악하게 돕는 설계다.
- contract aggregate를 보기 전에 어떤 계약 묶음이 포함됐는지 읽는 순서가 중요함을 배웠다.
- `RecoverySourceSummaryContractInventory` 타입을 추가했다.
- contract inventory는 전체 group count와 최신 group id를 포함한다.
- policy health snapshot에 `contractInventory`를 추가했다.
- inventory display text는 `5 contract groups · latest aggregate-coverage-display` 형태로 만든다.
- inventory rationale은 aggregate diagnostics를 읽기 전 현재 계약 목록을 요약한다고 설명한다.
- State Machine 패널에 contract inventory와 rationale을 표시했다.
- 기존 aggregate, coverage, display contract 흐름은 유지했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
