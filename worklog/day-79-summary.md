# 79일차 - 순서 범위 계약

- Review Order Scope Contract는 review order label의 적용 범위를 예제 기반으로 검증하는 설계다.
- 짧은 라벨은 의미를 압축하지만, scope가 계약화되지 않으면 적용 영역이 흐려질 수 있음을 배웠다.
- `RecoverySourceSummaryContractReviewOrderScopeInput` 타입을 추가했다.
- review order scope example 타입과 예제를 추가했다.
- review order scope formatter를 만들어 scope 생성을 한 곳으로 모았다.
- policy health snapshot에 `contractReviewOrderScopeContract`를 포함했다.
- contract group 목록에 `review-order-scope` group을 추가했다.
- review order, inventory, safety, aggregate coverage 기대값을 10개 contract group 기준으로 갱신했다.
- State Machine 패널에 review scope examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
