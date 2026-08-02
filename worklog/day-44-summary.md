# 44일차 - 정책 건강 스냅샷

- Policy Health Snapshot은 정책 메타데이터와 계약 체크 결과를 하나로 묶어 보여주는 설계다.
- 정책의 정체성과 건강 상태를 UI가 따로 조립하지 않도록 하는 것이 중요함을 배웠다.
- `RecoverySourceSummaryPolicyHealthSnapshot` 타입을 추가했다.
- health snapshot이 policy와 contract summary를 함께 갖도록 정의했다.
- `createRecoverySourceSummaryPolicyHealthSnapshot()` helper를 추가했다.
- recovery source summary 정책 모듈이 policy health snapshot을 생성하게 했다.
- State Machine 패널은 contract summary 대신 health snapshot을 소비하게 했다.
- State Machine 패널에 `policy health` 표시를 추가했다.
- UI가 정책의 id와 계약 예제 상태를 하나의 snapshot에서 읽도록 정리했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
