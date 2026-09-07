# 75일차 - 순서 표시 계약

- Review Order Display Contract는 contract review order 문장이 일관되게 만들어지는지 확인하는 설계다.
- AI UI에서 사용자가 진단을 따라 읽는 순서도 신뢰 경험의 일부가 됨을 배웠다.
- `RecoverySourceSummaryContractReviewOrderDisplayInput` 타입을 추가했다.
- review order display example 타입과 예제를 추가했다.
- review order id 목록을 display text로 바꾸는 formatter를 계약으로 검증했다.
- policy health snapshot에 `contractReviewOrderDisplayContract`를 포함했다.
- contract group 목록에 `review-order-display` group을 추가했다.
- inventory, safety, aggregate coverage 기대값을 8개 contract group 기준으로 갱신했다.
- State Machine 패널에 review order examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
