# 59일차 - 표현 상세 수준

- Presentation Detail Level은 화면 표시용 묶음이 얼마나 자세한 정보를 담는지 명시하는 설계다.
- 같은 presentation이라도 compact UI와 detailed UI는 사용자의 읽기 부담이 다르다는 점을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentationDetailLevel` 타입을 추가했다.
- detail level은 `compact` 또는 `detailed`로 표현되도록 했다.
- contract summary presentation이 `detailLevel` 필드를 함께 포함하도록 확장했다.
- 현재 State Machine 패널용 presentation은 `detailed`로 정의했다.
- presentation 생성 helper가 detail level을 일관되게 넣도록 했다.
- recovery source summary contract, guidance display contract, aggregate summary가 같은 detail level을 공유한다.
- State Machine 패널에 presentation detail을 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
