# 3일차 - AI Contract 검증 흐름 만들기

- AI Contract를 프론트엔드와 AI 사이의 입력/출력/검증 약속으로 정리했다.
- AI 응답을 바로 앱 상태로 믿지 않고 `unknown`으로 다루는 구조를 만들었다.
- `PlanResponse`와 `PlanTaskDraft` 타입을 별도 contract 타입으로 분리했다.
- `validatePlanResponse`로 tasks 배열, 개수, 필수 필드, day, duration 형식을 검사했다.
- mock planner가 안전한 앱 타입 대신 AI 응답처럼 생긴 값을 반환하도록 바꿨다.
- 검증을 통과한 응답만 `TaskSuggestion`으로 변환해 preview 카드로 승격했다.
- 일부러 깨진 AI 응답을 넣어보는 계약 실패 테스트 버튼을 추가했다.
- 계약 검증 실패 시 카드가 생성되지 않고 error UI가 표시되도록 했다.
- `npm run build`로 TypeScript/Vite 빌드를 검증했다.
- 브라우저에서 정상 응답과 깨진 응답 흐름을 각각 확인했다.
