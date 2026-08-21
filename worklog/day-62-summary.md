# 62일차 - 표현 메타데이터 표시문

- Presentation Metadata Display Text는 presentation 메타데이터를 한 줄 표시문으로 묶는 설계다.
- intent, detail level, audience를 UI가 직접 조립하면 표현 규칙이 컴포넌트에 흩어질 수 있음을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentation`에 `metadataText` 필드를 추가했다.
- metadata text는 intent, detail level, audience를 일관된 순서로 결합한다.
- 현재 metadata text는 `state-panel-contract-review · detailed · developer-learner` 형태로 표시된다.
- presentation 생성 helper가 metadata text를 함께 반환하게 했다.
- State Machine 패널은 개별 메타데이터 조각 대신 `metadataText`를 우선 표시한다.
- purpose와 audience rationale은 보조 설명으로 유지했다.
- 사용자는 presentation의 목적, 상세 수준, 대상을 한 줄로 빠르게 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
