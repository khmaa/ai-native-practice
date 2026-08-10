# 52일차 - 계약 요약 표시문

- Contract Summary Display Text는 계약 체크 숫자를 UI가 바로 표시할 수 있는 문구로 함께 제공하는 설계다.
- `passed`와 `total`을 UI마다 직접 조립하면 표시 규칙이 흩어질 수 있음을 배웠다.
- `RecoverySourceSummaryContractCheckSummary`에 `displayText` 필드를 추가했다.
- recovery source summary contract summary가 표준 display text를 반환하게 했다.
- guidance display contract summary도 같은 display text 포맷을 사용하게 했다.
- contract aggregate summary도 `passed/total passing` 표시문을 함께 반환하게 했다.
- display text 생성 helper를 정책 모듈 안에 추가했다.
- State Machine 패널은 숫자를 직접 조립하지 않고 summary의 `displayText`를 소비한다.
- 사용자는 개별 계약과 aggregate 계약 상태를 같은 문구 규칙으로 읽을 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
