# 66일차 - 계약 그룹 목록 표시문

- Contract Groups Summary Text는 여러 contract group 표시문을 하나의 목록 표시문으로 묶는 설계다.
- group 개별 표시문이 있어도 목록 결합 규칙이 UI에 남으면 표현 책임이 완전히 정리되지 않음을 배웠다.
- policy health snapshot에 `contractGroupsDisplayText` 필드를 추가했다.
- contract groups display text는 각 group의 `displayText`를 일관된 구분자로 결합한다.
- 현재 목록은 `summary:passing, guidance-display:passing, presentation-metadata:passing` 형태로 표시된다.
- group 목록 display helper를 recovery source summary policy 모듈에 추가했다.
- State Machine 패널은 `map + join` 대신 snapshot의 `contractGroupsDisplayText`를 소비한다.
- UI는 contract group 목록을 어떻게 조립할지 알 필요가 줄었다.
- 사용자는 aggregate에 포함된 contract group 상태를 한 줄로 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
