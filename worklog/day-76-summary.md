# 76일차 - 순서 근거 신호

- Review Order Rationale Signal은 contract review order가 왜 필요한지 짧은 라벨로 먼저 알려주는 설계다.
- AI UI 진단 패널이 길어질수록 긴 설명 전에 의미를 압축하는 신호가 필요함을 배웠다.
- `RecoverySourceSummaryContractReviewOrder`에 `rationaleLabel`을 추가했다.
- review order 생성 함수가 `diagnostic reading path` 라벨을 포함하도록 했다.
- 기존 review order display text와 rationale은 유지했다.
- State Machine 패널에 review order label을 표시했다.
- 사용자는 순서 문자열을 보기 전에 그 순서의 목적을 먼저 파악할 수 있다.
- contract group 수와 기존 display contract 흐름은 변경하지 않았다.
- public repo에 민감정보를 추가하지 않았다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
