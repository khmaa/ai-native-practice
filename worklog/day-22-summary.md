# 22일차 - 정책 버전 기록

- AI Native 앱의 검증 정책은 시간이 지나며 바뀔 수 있음을 배웠다.
- 정책 설명은 사람이 읽기 좋지만 과거 trace를 안정적으로 식별하기에는 부족하다.
- 정책에 안정적인 식별자인 `plannerPolicyVersion`을 추가했다.
- 현재 버전은 `planner-policy-v1`로 정의했다.
- `describePlannerPolicy`가 정책 설명 안에 버전도 포함하도록 바꿨다.
- `createPlannerPolicySnapshot`으로 버전과 설명을 함께 묶어 만들도록 했다.
- `AgentTrace`에 `policyVersion` 필드를 추가했다.
- AI 요청 trace 생성 시 policy version과 description을 함께 저장하도록 했다.
- Agent Trace 패널에서 `Policy version`을 별도 항목으로 확인할 수 있게 했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
