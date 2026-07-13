# 28일차 - 행동 Affordance 연결

- action hint가 글로만 존재하면 실제 어떤 UI 조작을 해야 하는지 약할 수 있음을 배웠다.
- Action Affordance Mapping은 권장 행동과 실제 버튼·조작을 연결하는 설계다.
- `PlannerIssue`에 `recommendedAction` 필드를 추가했다.
- AI validation 실패는 `regenerate` action으로 매핑했다.
- Apply Guard 실패는 `edit-preview` action으로 매핑했다.
- Preview 오류 UI에서 recommended action을 별도 줄로 표시했다.
- regenerate가 권장될 때 `권장: 다시 생성` 버튼으로 강조되도록 했다.
- edit-preview가 권장될 때 닫기 버튼을 `Preview 수정하기`로 바꿨다.
- recommended 버튼 스타일을 추가해 실제 affordance가 눈에 들어오게 했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
