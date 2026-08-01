# 43일차 - 정책 체크 요약 계약

- Policy Check Summary Contract는 정책 check 결과를 UI가 조립하지 않도록 요약 계약으로 제공하는 설계다.
- 화면은 raw check data를 해석하기보다 정책 모듈이 제공한 summary를 표시하는 편이 낫다는 점을 배웠다.
- `RecoverySourceSummaryContractCheckSummary` 타입을 추가했다.
- summary 계약을 total, passed, diagnostics 필드로 정의했다.
- `summarizeRecoverySourceSummaryContractChecks()` helper를 추가했다.
- 정책 모듈이 pass count와 diagnostics 문자열을 계산하도록 했다.
- State Machine 패널은 summary contract만 소비하도록 단순화했다.
- 패널 내부의 diagnostics 조립 helper를 제거했다.
- 정책 해석 로직이 recovery source summary 정책 모듈 안으로 모였다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
