# 5일차 - AI 호출 경계 분리하기

- 프론트엔드가 AI 구현 세부사항을 직접 알지 않도록 호출 경계를 분리했다.
- `PlanRequest` 타입을 추가해 AI에게 보내는 입력 계약을 명확히 했다.
- `requestPlanDraft` 함수로 mock AI 응답 요청을 별도 agent 계층에 두었다.
- 앱은 `PlanRequest`를 보내고 `unknown` 응답을 받는 구조로 바뀌었다.
- 받은 응답은 기존처럼 `validatePlanResponse`를 통과해야 preview 상태가 된다.
- 계약 실패 테스트도 같은 agent 경계를 통해 깨진 응답을 받도록 정리했다.
- 이 구조는 나중에 mock 대신 serverless API로 바꾸기 쉽게 만든다.
- `npm run build`로 TypeScript/Vite 빌드를 검증했다.
- 브라우저에서 정상 생성과 계약 실패 흐름을 다시 확인했다.
- AI native 프론트엔드에서는 모델 호출보다 호출 경계와 검증 경계가 중요하다는 점을 배웠다.
