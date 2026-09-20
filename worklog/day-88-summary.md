# 88일차 - 밀도 안내 상태 이유

- Density Guidance Status Reason은 readiness status가 왜 나왔는지 설명하는 설계다.
- AI Native UI에서는 상태 label만 보여주면 사용자가 다시 추론해야 하므로 짧은 이유가 함께 필요하다.
- density guidance set에 `statusReason` 필드를 추가했다.
- `ready` 상태는 모든 density guidance item이 존재한다는 이유를 가진다.
- `incomplete` 상태는 누락된 guidance item 수를 이유로 가진다.
- 현재 set은 3개 항목이 모두 있어 `All density guidance items are present.`로 설명된다.
- State Machine 패널에서 status와 reason을 나란히 확인할 수 있게 했다.
- 기존 item count, status display, rationale 흐름은 유지했다.
- 새 contract group을 추가하지 않고 readiness 판단의 설명 가능성만 좁게 확장했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
