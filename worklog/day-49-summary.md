# 49일차 - 정책 안내 표시문

- Policy Guidance Display Text는 정책 안내 메타데이터를 UI에 표시할 한 줄 문구로 묶는 설계다.
- UI가 `severity`, `tone`, `label`을 직접 조립하면 표시 규칙이 컴포넌트에 흩어질 수 있음을 배웠다.
- `RecoverySourceSummaryPolicyHealthGuidance`에 `displayText` 필드를 추가했다.
- guidance display text를 recovery source summary 정책 모듈에서 생성하게 했다.
- display text는 `severity`, `tone`, `label`을 일관된 순서로 결합한다.
- `healthy` guidance는 `info · calm · safe to display`로 표시된다.
- `degraded` guidance는 `warning · cautious · review diagnostics`로 표시된다.
- State Machine 패널은 직접 조립 대신 `policyHealth.guidance.displayText`를 소비한다.
- 사용자는 정책 안내의 강도, 말투, 의미를 한 줄로 빠르게 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
