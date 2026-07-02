# 20일차 - 공유 검증 정책

- AI Native 앱에는 AI 응답 검증, Apply Guard, context 구성처럼 여러 검증 경계가 생긴다.
- 같은 제품 정책이 여러 파일에 흩어지면 시간이 지나며 서로 다른 기준으로 동작할 수 있음을 배웠다.
- day, duration, title normalization 기준을 `plannerPolicy`로 분리했다.
- 허용 day 목록을 `allowedPlanDays`로 한 곳에서 관리하도록 했다.
- day 메시지는 `formatAllowedPlanDays`를 통해 같은 기준에서 생성되도록 했다.
- duration 형식 검사는 `isPlanDuration`으로 공통화했다.
- title 비교 기준은 `normalizeTaskTitle`로 통일했다.
- AI 응답 검증과 Apply Guard가 같은 제품 정책을 사용하도록 바꿨다.
- context dedupe와 mock planner도 같은 title normalization을 바라보게 했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
