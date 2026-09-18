# 86일차 - 밀도 안내 묶음 신호

- Density Guidance Set Signal은 density guidance가 display, detail, rationale을 모두 갖췄는지 보여주는 설계다.
- 안내 문장이 여러 조각으로 나뉠수록 전체 묶음의 완성도도 관찰 가능한 상태가 되어야 함을 배웠다.
- `RecoverySourceSummaryContractDensityGuidanceSet` 타입을 추가했다.
- policy health snapshot에 `contractDensityGuidanceSet`을 포함했다.
- density guidance set은 display text, detail message, rationale의 존재 여부를 계산한다.
- 현재 guidance set은 3개 안내 조각이 모두 존재한다.
- set display text는 `3/3 guidance item(s) present` 형태로 표시된다.
- State Machine 패널에 density guidance set과 rationale을 표시했다.
- 기존 density guidance display/detail/rationale contract 흐름은 유지했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
