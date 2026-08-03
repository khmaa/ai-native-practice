# 45일차 - 정책 건강 상태

- Policy Health Status는 계약 체크 결과를 사람이 바로 읽을 수 있는 상태 라벨로 해석하는 설계다.
- 단순히 `2/2 passing`을 보여주는 것과 `healthy`라고 판단해주는 것의 차이를 배웠다.
- `RecoverySourceSummaryPolicyHealthStatus` 타입을 추가했다.
- policy health snapshot이 `healthy` 또는 `degraded` 상태를 포함하도록 확장했다.
- 계약 예제가 모두 통과하면 `healthy`, 하나라도 실패하면 `degraded`가 되도록 했다.
- `createRecoverySourceSummaryPolicyHealthSnapshot()`이 contract summary를 한 번 계산하고 상태를 함께 반환하게 했다.
- State Machine 패널은 policy id와 health status를 함께 표시하게 했다.
- 사용자는 recovery source summary 정책이 현재 신뢰 가능한지 더 빠르게 확인할 수 있다.
- 정책의 숫자 결과를 앱이 해석 가능한 UI 상태로 승격하는 흐름을 관찰했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
