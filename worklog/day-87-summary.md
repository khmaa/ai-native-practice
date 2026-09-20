# 87일차 - 밀도 안내 준비 상태

- Density Guidance Readiness는 안내 묶음의 개수를 사용자가 해석 가능한 상태로 바꾸는 설계다.
- AI Native UI에서는 관찰값만큼이나 그 관찰값이 행동 가능한지 보여주는 status가 중요하다.
- `RecoverySourceSummaryContractDensityGuidanceSetStatus` 타입을 추가했다.
- density guidance set에 `ready`와 `incomplete` 상태를 추가했다.
- 현재 set은 display, detail, rationale 3개 항목이 모두 있어 `ready`로 계산된다.
- status display text는 `ready for review` 또는 `needs guidance repair`로 표시된다.
- State Machine 패널에서 density guidance set status를 직접 확인할 수 있게 했다.
- 기존 guidance set의 item count와 rationale 흐름은 유지했다.
- 새 contract group을 추가하지 않고 파생 판단 신호만 좁게 확장했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
