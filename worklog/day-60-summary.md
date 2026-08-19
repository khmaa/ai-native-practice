# 60일차 - 표현 대상

- Presentation Audience는 화면 표시용 묶음이 누구를 위한 표현인지 명시하는 설계다.
- 같은 contract summary라도 최종 사용자용 UI와 개발자 학습용 UI는 필요한 정보량이 다름을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentationAudience` 타입을 추가했다.
- 현재 audience는 `developer-learner`로 정의했다.
- contract summary presentation이 `audience` 필드를 함께 포함하도록 확장했다.
- presentation 생성 helper가 audience를 일관되게 넣도록 했다.
- recovery source summary contract, guidance display contract, aggregate summary가 같은 audience를 공유한다.
- State Machine 패널에 presentation audience를 표시했다.
- 사용자는 이 표현 묶음이 개발자 학습자에게 맞춰진 상세 관찰 UI임을 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
