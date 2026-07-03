# 21일차 - 보이는 검증 정책

- AI Native UI에서 검증 정책은 코드 안에만 있으면 사용자가 예측하기 어렵다는 점을 배웠다.
- Policy Transparency는 어떤 값이 통과되고 차단되는지 화면과 trace에서 보이게 하는 설계다.
- `plannerPolicy`에 현재 정책을 설명하는 `describePlannerPolicy`를 추가했다.
- 정책 설명은 day, duration, title uniqueness 기준을 한 문장으로 요약한다.
- Planning request 입력 영역에 현재 planner policy 안내를 표시했다.
- 사용자는 생성 전에 어떤 기준으로 초안이 검증될지 미리 볼 수 있게 됐다.
- `AgentTrace`에 `policyDescription`을 추가해 요청 당시의 정책 snapshot을 남겼다.
- valid, contract-failure, duplicate-title 요청 모두 trace에 같은 정책 설명을 기록한다.
- Agent Trace 패널에 `Policy` 항목을 추가해 검증 기준을 관찰할 수 있게 했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
