# 27일차 - 복구 행동 힌트

- 오류 UX에서 실패 이유와 다음 행동은 서로 다른 정보임을 배웠다.
- recovery 문구는 왜 실패했고 어떤 맥락에서 회복해야 하는지를 설명한다.
- action hint는 사용자가 지금 취할 다음 행동을 짧고 명확하게 제안한다.
- `PlannerIssue`에 선택적 `actionHint` 필드를 추가했다.
- semantic validation 실패에는 정책을 통과하는 AI draft를 다시 요청하라는 hint를 붙였다.
- schema validation 실패에는 출력 계약을 만족하는 응답을 다시 요청하라는 hint를 붙였다.
- Apply Guard 실패에는 preview 값을 수정한 뒤 다시 적용하라는 hint를 붙였다.
- Preview 오류 UI에서 action hint를 recovery 아래 별도 줄로 표시했다.
- action hint가 안내 문장처럼 보이도록 별도 스타일을 추가했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
