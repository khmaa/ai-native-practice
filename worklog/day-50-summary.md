# 50일차 - 정책 안내 표시 계약

- Policy Guidance Display Contract는 guidance 표시문이 의도한 형식을 지키는지 예제로 검증하는 설계다.
- `displayText`도 단순 문자열이 아니라 정책이 보장해야 하는 출력 계약임을 배웠다.
- `RecoverySourceSummaryPolicyHealthGuidanceDisplayInput` 타입을 추가했다.
- `RecoverySourceSummaryPolicyHealthGuidanceDisplayExample` 타입을 추가했다.
- healthy guidance 표시 예제를 `info · calm · safe to display`로 정의했다.
- degraded guidance 표시 예제를 `warning · cautious · review diagnostics`로 정의했다.
- guidance display examples를 실행해 check summary를 만드는 helper를 추가했다.
- policy health snapshot이 `guidanceDisplayContract`를 함께 포함하도록 확장했다.
- State Machine 패널에 guidance display examples와 diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
