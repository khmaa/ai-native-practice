# 90일차 - 이유 표시 절단 신호

- Reason Truncation Signal은 표시용 reason이 원문에서 잘렸는지 알려주는 설계다.
- AI Native UI에서는 요약된 문구를 보여줄 때 원문 보존 여부와 표시 손실 여부를 구분해야 한다.
- density guidance set에 `statusReasonTruncated` 필드를 추가했다.
- `statusReasonDisplayText`는 화면 표시용 문자열로 유지했다.
- `statusReasonTruncated`는 표시용 문자열과 원문 reason이 다른지로 계산한다.
- 현재 reason은 48자보다 짧아 `complete reason`으로 표시된다.
- State Machine 패널에서 reason display 상태를 확인할 수 있게 했다.
- 기존 readiness status, reason 원문, rationale 흐름은 유지했다.
- 새 contract group을 추가하지 않고 표시 손실 관찰 신호만 좁게 확장했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
