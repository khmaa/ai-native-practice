# 74일차 - 계약 읽기 순서

- Contract Review Order Signal은 여러 contract group을 어떤 순서로 읽을지 알려주는 설계다.
- 계약이 많아질수록 pass/fail 결과뿐 아니라 diagnostics를 읽는 순서도 UI의 신뢰 경험에 영향을 준다.
- `RecoverySourceSummaryContractReviewOrder` 타입을 추가했다.
- review order는 contract group id 목록을 포함한다.
- review order display text는 contract group id를 배열 순서대로 연결한다.
- policy health snapshot에 `contractReviewOrder`를 포함했다.
- review order는 기존 contract group 배열에서 파생되므로 source of truth를 늘리지 않는다.
- State Machine 패널에 review order와 rationale을 표시했다.
- 기존 inventory safety, inventory display, aggregate coverage 흐름은 유지했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
