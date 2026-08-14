# 55일차 - 계약 상태 표시문

- Contract Summary Status Display는 계약 상태와 이유를 하나의 표시 문구로 묶는 설계다.
- UI가 `status`와 `statusReason`을 직접 조립하면 표시 규칙이 컴포넌트에 흩어질 수 있음을 배웠다.
- `RecoverySourceSummaryContractCheckSummary`에 `statusDisplayText` 필드를 추가했다.
- status display text는 `status`와 `statusReason`을 일관된 순서로 결합한다.
- passing summary는 `passing · all contract examples passed`로 표시된다.
- failing summary는 실패 example 수를 포함한 reason과 함께 표시된다.
- recovery source summary contract에 status display text를 추가했다.
- guidance display contract와 aggregate summary에도 같은 status display 규칙을 적용했다.
- State Machine 패널은 직접 조립 대신 summary의 `statusDisplayText`를 소비한다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
