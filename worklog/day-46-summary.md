# 46일차 - 정책 건강 안내

- Policy Health Guidance는 정책 상태를 사용자가 이해할 수 있는 행동 안내로 바꾸는 설계다.
- `healthy`라는 라벨만으로는 충분하지 않고, 왜 믿어도 되는지 설명이 필요함을 배웠다.
- `RecoverySourceSummaryPolicyHealthGuidance` 타입을 추가했다.
- policy health snapshot이 `guidance` 객체를 함께 포함하도록 확장했다.
- `healthy` 상태에는 `safe to display` 안내를 연결했다.
- `degraded` 상태에는 `review diagnostics` 안내를 연결했다.
- guidance는 정책 모듈에서 생성되어 UI가 임의로 해석하지 않게 했다.
- State Machine 패널에 guidance label과 detail을 표시했다.
- 사용자는 정책 상태뿐 아니라 다음에 무엇을 확인해야 하는지 함께 볼 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
