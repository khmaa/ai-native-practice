# 61일차 - 표현 대상 이유

- Presentation Audience Rationale은 presentation audience가 왜 선택됐는지 설명하는 설계다.
- audience 값만 있으면 왜 그 대상에게 맞춘 표현인지 사용자가 추론해야 함을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentation`에 `audienceRationale` 필드를 추가했다.
- audience rationale은 developer learner에게 상세 정책 계약 메타데이터가 필요한 이유를 설명한다.
- 현재 reason은 AI UI trust signal이 조립되는 방식을 학습자가 관찰하기 위함으로 정의했다.
- presentation 생성 helper가 audience와 audience rationale을 함께 반환하게 했다.
- recovery source summary contract, guidance display contract, aggregate summary가 같은 rationale을 공유한다.
- State Machine 패널에 audience rationale을 표시했다.
- 사용자는 presentation이 누구를 위한 것인지뿐 아니라 왜 그런 대상에게 맞춰졌는지도 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
