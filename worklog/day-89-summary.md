# 89일차 - 밀도 안내 이유 표시

- Density Guidance Reason Display는 상태 이유 원문과 UI 표시 문자열을 분리하는 설계다.
- AI Native UI에서는 설명 가능성을 유지하되 패널의 정보 밀도도 관리해야 한다.
- density guidance set에 `statusReasonDisplayText` 필드를 추가했다.
- `statusReason`은 원문 이유로 유지하고, display text는 화면 표시용으로 계산한다.
- 표시용 reason은 48자 안에서는 그대로 보여주고, 더 길면 말줄임표로 줄인다.
- State Machine 패널은 원문 대신 `statusReasonDisplayText`를 표시한다.
- 현재 reason은 짧기 때문에 `All density guidance items are present.`가 그대로 표시된다.
- 기존 readiness status, item count, rationale 흐름은 유지했다.
- 새 contract group을 추가하지 않고 표시 안정성만 좁게 확장했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
