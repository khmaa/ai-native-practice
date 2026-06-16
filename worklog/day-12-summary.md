# 12일차 - Semantic Validation 확장하기

- AI 응답은 JSON 구조가 맞아도 제품에서 바로 쓸 수 없을 수 있음을 배웠다.
- 기존 validation이 필드 존재, task 개수, day, duration 같은 형식 중심이었음을 확인했다.
- 제품 정책 관점에서 같은 title이 반복되는 task draft는 preview로 승격하지 않기로 정했다.
- `validatePlanResponse`에 title 중복 검사를 추가했다.
- 중복 비교는 공백 제거 후 한글 locale 기반 소문자 정규화를 거친 title로 수행했다.
- mock planner에 형식은 맞지만 title이 중복된 응답을 만드는 모드를 추가했다.
- planner agent와 trace mode에 `duplicate-title` 흐름을 연결했다.
- Preview에 `중복 응답 테스트` 버튼을 추가해 semantic validation 실패를 직접 관찰하게 했다.
- `npm run build`와 독립 실행 사례로 중복 title 응답이 실패하는 것을 검증했다.
- 브라우저에서 중복 응답이 `object with tasks[5]`이지만 validation 실패로 카드가 생성되지 않음을 확인했다.
