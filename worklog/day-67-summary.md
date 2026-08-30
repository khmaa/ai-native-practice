# 67일차 - 계약 그룹 표시 계약

- Contract Groups Display Contract는 contract group 목록 표시문이 의도한 형식을 지키는지 예제로 검증하는 설계다.
- `contractGroupsDisplayText`도 단순 문자열이 아니라 정책이 보장해야 하는 출력 계약임을 배웠다.
- contract groups display input 타입을 추가했다.
- contract groups display example 타입을 추가했다.
- group 목록 표시 예제를 `summary:passing, guidance-display:passing, presentation-metadata:passing, contract-groups-display:passing`으로 정의했다.
- group 목록 표시 예제를 실행해 contract check summary를 만드는 helper를 추가했다.
- policy health snapshot이 `contractGroupsDisplayContract`를 함께 포함하도록 확장했다.
- contract groups display contract도 contract group과 aggregate health 판단에 포함했다.
- State Machine 패널에 group display examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
