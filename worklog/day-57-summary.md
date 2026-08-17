# 57일차 - 표현 의도

- Presentation Intent는 화면 표시용 텍스트 묶음이 어떤 UI 목적을 위해 만들어졌는지 명시하는 설계다.
- presentation 객체가 텍스트만 제공하면 어디에 맞춘 표현인지 소비자가 추론해야 함을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentationIntent` 타입을 추가했다.
- contract summary presentation이 `intent` 필드를 함께 포함하도록 확장했다.
- 현재 intent는 `state-panel-contract-review`로 정의했다.
- presentation 생성 helper가 항상 같은 intent를 넣도록 했다.
- recovery source summary contract, guidance display contract, aggregate summary가 같은 intent를 공유한다.
- State Machine 패널에 aggregate presentation intent를 표시했다.
- 사용자는 이 표현 묶음이 contract review UI를 위한 것임을 화면에서 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
