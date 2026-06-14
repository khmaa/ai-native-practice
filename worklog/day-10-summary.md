# 10일차 - Context 예산과 우선순위

- AI context는 앱 상태가 커져도 무한히 확장할 수 없으므로 명시적인 예산이 필요함을 배웠다.
- task 제목 context를 최대 5개로 제한하는 `taskTitleContextBudget` 정책을 만들었다.
- 사용자가 이미 승인한 task를 현재 preview draft보다 먼저 포함하도록 우선순위를 정했다.
- 같은 제목은 대소문자와 공백을 정규화해 context에 한 번만 포함되도록 했다.
- 빈 제목은 AI 요청 context 후보에서 제외했다.
- context 선택 책임을 `planContext` 유틸로 분리해 UI orchestration과 정책을 구분했다.
- `PlanContext`에 제목 예산과 제외된 후보 개수를 명시적으로 기록했다.
- Agent Trace에서 포함된 제목 수, 전체 예산, 제외된 제목 수를 확인할 수 있게 했다.
- `npm run build`와 독립 실행 사례로 빈 context, 중복 제거, 승인 우선순위를 검증했다.
- 로컬 서버 실행 권한을 얻지 못해 이번 일차의 브라우저 검증은 진행하지 못했다.
