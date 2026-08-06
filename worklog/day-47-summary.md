# 47일차 - 정책 안내 강도

- Policy Guidance Severity는 정책 안내가 단순 정보인지 주의 신호인지 구분하는 설계다.
- 같은 guidance라도 `info`와 `warning`은 사용자가 받아들이는 무게가 다름을 배웠다.
- `RecoverySourceSummaryPolicyHealthGuidanceSeverity` 타입을 추가했다.
- guidance 객체가 `severity`를 함께 포함하도록 확장했다.
- `healthy` 상태는 `info` severity로 매핑했다.
- `degraded` 상태는 `warning` severity로 매핑했다.
- severity 결정은 UI가 아니라 recovery source summary 정책 모듈에서 담당하게 했다.
- State Machine 패널은 guidance label 앞에 severity를 함께 표시한다.
- 사용자는 정책 안내를 읽기 전에 주의 수준을 먼저 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
