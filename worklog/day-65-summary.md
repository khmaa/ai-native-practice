# 65일차 - 계약 그룹 표시문

- Contract Group Display Text는 계약 group의 id와 status를 UI 표시용 문구로 묶는 설계다.
- group 목록을 UI가 직접 `id:status`로 조립하면 표시 규칙이 컴포넌트에 흩어질 수 있음을 배웠다.
- `RecoverySourceSummaryContractGroup`에 `displayText` 필드를 추가했다.
- contract group을 만드는 helper를 추가했다.
- group display text는 group id와 summary status를 결합한다.
- summary contract group은 `summary:passing` 형태로 표시된다.
- guidance display와 presentation metadata group도 같은 표시 규칙을 따른다.
- State Machine 패널은 직접 조립 대신 group의 `displayText`를 소비한다.
- 사용자는 aggregate에 포함된 contract group과 각 상태를 한 줄로 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
