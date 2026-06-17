# 13일차 - Validation 실패 이유 보여주기

- AI validation 실패를 모두 같은 오류로 보여주면 사용자가 무엇을 고쳐야 하는지 알기 어렵다는 점을 배웠다.
- 실패를 응답 구조 문제인 `schema`와 제품 기준 문제인 `semantic`으로 분류했다.
- `PlanValidationResult` 실패 타입에 validation category를 추가했다.
- `validatePlanResponse`의 기본 실패는 schema로 유지하고 title 중복 실패는 semantic으로 표시했다.
- `AgentTrace`와 `completeTrace`가 validation category를 함께 기록하도록 확장했다.
- Agent Trace에 `Validation kind` 항목을 추가해 실패 종류를 관찰할 수 있게 했다.
- schema 실패에는 AI 응답 구조가 계약과 다르다는 오류 제목을 보여줬다.
- semantic 실패에는 응답 구조는 맞지만 제품 기준을 통과하지 못했다는 오류 제목을 보여줬다.
- `npm run build`와 독립 실행 사례로 schema/semantic 분류를 검증했다.
- 브라우저에서 계약 실패와 중복 응답 테스트가 서로 다른 안내와 trace kind를 보여주는 것을 확인했다.
