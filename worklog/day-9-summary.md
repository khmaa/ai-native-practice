# 9일차 - 필요한 Context만 설계하기

- Context Engineering은 많은 정보를 보내는 것이 아니라 현재 판단에 필요한 정보를 선택하는 일임을 배웠다.
- 현재 planner가 새 계획을 만들 때 승인된 task와 preview draft를 참고해야 하는 이유를 정리했다.
- `PlanContext` 타입을 추가해 context를 명시적인 AI 입력 계약으로 만들었다.
- 전체 task 객체 대신 `approvedTaskTitles`와 `draftTaskTitles`만 전달하도록 범위를 제한했다.
- 요청 생성 시점의 승인 task와 draft 제목을 context snapshot으로 만들었다.
- `plannerAgent`가 prompt와 context를 함께 mock planner에 전달하도록 변경했다.
- mock planner가 기존 제목과 겹치는 작업을 감지해 다음 단계인 `보완` 작업을 제안하도록 했다.
- Agent Trace에서 approved context와 draft context를 각각 확인할 수 있게 했다.
- `npm run build`로 TypeScript/Vite 빌드를 검증했다.
- 브라우저에서 첫 생성, draft 기반 재생성, 승인 task 기반 재생성의 context 흐름을 확인했다.
