# 63일차 - 표현 메타데이터 계약

- Presentation Metadata Contract는 presentation metadata 표시문이 의도한 형식을 지키는지 예제로 검증하는 설계다.
- `metadataText`도 단순 문자열이 아니라 정책이 보장해야 하는 출력 계약임을 배웠다.
- presentation metadata input 타입을 추가했다.
- presentation metadata example 타입을 추가했다.
- `state-panel-contract-review · detailed · developer-learner` 표시 예제를 정의했다.
- metadata example을 실행해 contract check summary를 만드는 helper를 추가했다.
- policy health snapshot이 `presentationMetadataContract`를 함께 포함하도록 확장했다.
- contract aggregate가 presentation metadata contract도 합산하게 했다.
- State Machine 패널에 metadata examples, status, diagnostics를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
