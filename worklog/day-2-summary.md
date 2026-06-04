# 2일차 - 플래너 구조 리팩터링

- `App.tsx`에 몰려 있던 planner 로직을 타입, 유틸, 컴포넌트로 분리했다.
- `TaskSuggestion`, `ApprovedTask`, `PlannerStatus` 타입을 별도 파일로 정리했다.
- mock AI plan 생성과 streaming message를 `mockPlanner` 유틸로 이동했다.
- prompt 입력, preview, task card, approved panel을 독립 컴포넌트로 나눴다.
- preview 영역에 선택된 task 개수를 표시했다.
- approved panel에 적용된 task 개수를 표시했다.
- 기존 mock streaming, apply, undo 흐름은 유지했다.
- `npm run build`로 TypeScript/Vite 빌드를 검증했다.
- 브라우저에서 샘플 생성, 카드 스트리밍, 적용, undo 흐름을 확인했다.
