# 58일차 - 표현 의도 설명

- Presentation Intent Description은 presentation intent를 사람이 읽을 수 있는 설명으로 풀어주는 설계다.
- `state-panel-contract-review` 같은 기계용 값만으로는 사용자가 목적을 바로 이해하기 어렵다는 점을 배웠다.
- `RecoverySourceSummaryContractCheckSummaryPresentation`에 `intentDescription` 필드를 추가했다.
- presentation 생성 helper가 intent와 intent description을 함께 반환하게 했다.
- 현재 설명은 `Summarizes contract checks for review inside the state panel.`로 정의했다.
- recovery source summary contract, guidance display contract, aggregate summary가 같은 설명을 공유한다.
- State Machine 패널에 presentation purpose를 표시했다.
- 사용자는 presentation이 contract review UI를 위한 표현 묶음임을 자연어로 확인할 수 있다.
- 구현 범위는 policy presentation 계약과 관찰 UI에만 작게 제한했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
