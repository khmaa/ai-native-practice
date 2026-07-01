# 19일차 - 적용 전 검문

- AI Native UI에서 `Apply`는 draft가 앱 상태로 승격되는 마지막 경계임을 배웠다.
- AI 응답 검증과 사용자가 수정한 preview 값 검증은 서로 다른 단계임을 구분했다.
- editable preview에서는 사용자가 title, day, duration 등을 다시 깨뜨릴 수 있다.
- 적용 직전에 선택 항목만 검사하는 `validateApplySelection`을 추가했다.
- 선택 항목이 없거나 title/detail이 비어 있으면 Apply를 막도록 했다.
- day는 월/화/수/목/금/주말 중 하나인지 다시 확인하도록 했다.
- duration은 `60m` 같은 형식인지 Apply 직전에 검사하도록 했다.
- 선택 항목 안에서 title이 중복되면 App State로 승격하지 않게 했다.
- Apply 성공 시 문자열 필드는 trim한 값으로 저장하도록 정리했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
