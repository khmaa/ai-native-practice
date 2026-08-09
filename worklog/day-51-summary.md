# 51일차 - 정책 계약 합산

- Policy Contract Aggregate는 여러 계약 체크 결과를 하나의 건강 상태 판단으로 묶는 설계다.
- 개별 contract가 늘어나면 UI가 각각을 따로 해석하기보다 aggregate를 기준으로 판단해야 함을 배웠다.
- policy health snapshot에 `contractAggregate` 필드를 추가했다.
- recovery source summary contract와 guidance display contract를 합산하게 했다.
- aggregate는 전체 example 수와 통과 example 수를 함께 계산한다.
- aggregate diagnostics는 실패한 contract group 이름과 진단을 함께 보여준다.
- policy health status는 이제 summary contract 하나가 아니라 aggregate 결과를 기준으로 계산된다.
- State Machine 패널에 contract aggregate와 aggregate diagnostics를 표시했다.
- 사용자는 여러 정책 계약의 전체 건강 상태를 한눈에 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
