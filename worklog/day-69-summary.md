# 69일차 - 범위 표시 계약

- Contract Aggregate Coverage Display Contract는 aggregate coverage 문장이 일관되게 만들어지는지 확인하는 설계다.
- UI에 보이는 설명 문자열도 앱 상태 신뢰의 일부라는 점을 배웠다.
- `RecoverySourceSummaryContractAggregateCoverageDisplayInput` 타입을 추가했다.
- coverage display example 타입과 예제를 추가했다.
- `groupCount`를 coverage display text로 바꾸는 formatter를 계약 대상으로 분리했다.
- coverage display check와 summary 함수를 추가했다.
- policy health snapshot에 `contractAggregateCoverageDisplayContract`를 포함했다.
- contract group 목록에 aggregate coverage display contract를 포함했다.
- State Machine 패널에 coverage display examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
