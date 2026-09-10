# 77일차 - 순서 라벨 계약

- Review Order Label Contract는 review order의 짧은 rationale label을 예제 기반으로 검증하는 설계다.
- UI가 짧은 라벨로 의미를 압축할수록 그 라벨도 신뢰 가능한 계약 대상이 되어야 함을 배웠다.
- `RecoverySourceSummaryContractReviewOrderLabelInput` 타입을 추가했다.
- review order label example 타입과 예제를 추가했다.
- review order label formatter를 만들어 라벨 생성을 한 곳으로 모았다.
- policy health snapshot에 `contractReviewOrderLabelContract`를 포함했다.
- contract group 목록에 `review-order-label` group을 추가했다.
- review order, inventory, safety, aggregate coverage 기대값을 9개 contract group 기준으로 갱신했다.
- State Machine 패널에 review label examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
