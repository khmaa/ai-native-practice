# 17일차 - Context 결정 추적

- AI context는 자동으로 생기는 payload가 아니라 앱이 선택한 결과임을 배웠다.
- 좋은 Agent Trace는 무엇을 보냈는지뿐 아니라 왜 보냈는지도 설명해야 한다.
- `FeedbackDecision` 타입을 추가해 validation feedback과 user note의 포함 여부를 분리했다.
- validation feedback은 `included`, `excluded-stale`, `none` 중 하나로 추적되도록 했다.
- user note도 `included`, `none` 상태로 명확히 표시했다.
- `createPlanFeedback`이 feedback payload와 decision trace를 함께 만들도록 바꿨다.
- 실제 `PlanRequest` 계약에는 관찰용 decision 정보를 섞지 않았다.
- Agent Trace 패널에 `Feedback decision` 항목을 추가해 선택 근거를 볼 수 있게 했다.
- stale validation feedback이 차단된 경우에도 그 판단이 trace에 남게 됐다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
