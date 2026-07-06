# 24일차 - 규칙 메타데이터 사전

- rule id는 안정적인 식별자지만 그 자체만으로는 사용자가 이해하기 어렵다는 점을 배웠다.
- Rule Metadata Registry는 각 규칙에 이름, 설명, 복구 힌트를 연결하는 정책 사전이다.
- `PlannerPolicyRuleMetadata` 타입을 추가해 rule metadata의 구조를 정의했다.
- `plannerPolicyRules` registry를 만들어 모든 rule id의 의미를 한곳에 모았다.
- 각 규칙에 `label`, `description`, `recoveryHint`를 추가했다.
- `getPlannerPolicyRule` helper로 rule id에서 metadata를 조회할 수 있게 했다.
- Apply Guard 오류 메시지가 registry의 label과 recovery hint를 사용하도록 바꿨다.
- Agent Trace의 policy rule 표시가 `id · label` 형태로 읽히게 됐다.
- retry feedback 요약에서도 같은 rule metadata 해석을 사용하도록 했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
