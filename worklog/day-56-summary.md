# 56일차 - 계약 요약 표현

- Contract Summary Presentation은 계약 요약의 화면 표시용 텍스트를 한 객체로 묶는 설계다.
- contract summary에는 계산용 값과 표시용 값이 함께 있으므로 소비자가 목적에 맞게 읽기 쉽게 나눌 필요가 있음을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentation` 타입을 추가했다.
- contract check summary가 `presentation` 객체를 함께 포함하도록 확장했다.
- presentation은 `countText`, `statusText`, `diagnosticsText`를 제공한다.
- recovery source summary contract summary에 presentation을 추가했다.
- guidance display contract summary에도 같은 presentation 구조를 적용했다.
- contract aggregate summary도 동일한 presentation 구조를 사용한다.
- State Machine 패널은 개별 필드 대신 summary의 `presentation` 객체를 소비한다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
