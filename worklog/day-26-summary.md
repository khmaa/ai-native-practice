# 26일차 - 구조화된 오류 Context

- AI Native UI에서 오류도 단순 문자열이 아니라 구조화된 상태 계약임을 배웠다.
- rule id와 label을 message 문자열에 섞으면 UI가 그 의미를 다시 해석하기 어렵다.
- `PlannerIssue`에 선택적 `rule` 필드를 추가했다.
- validation error와 Apply Guard error가 rule metadata를 구조적으로 넘기도록 바꿨다.
- 사용자용 message는 순수한 실패 설명으로 남기고 policy metadata는 별도 필드로 분리했다.
- recovery 문구는 기존처럼 rule description과 recovery hint를 활용하도록 유지했다.
- Preview 오류 UI에서 `Policy rule: id · label`을 별도 줄로 표시했다.
- 오류 rule metadata가 본문보다 보조 정보로 읽히도록 스타일을 추가했다.
- 향후 자동 복구, 분석, 필터링으로 확장하기 쉬운 오류 상태 구조가 됐다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
