# 39일차 - 정책 출력 계약

- Policy Output Contract는 정책 함수가 반환하는 결과 구조를 타입으로 명시하는 설계다.
- 정책 모듈은 입력뿐 아니라 출력도 UI가 믿을 수 있는 계약이어야 함을 배웠다.
- `RecoverySourceSummaryResult` 타입을 추가했다.
- 결과 계약을 `text`, `policy`, `truncated` 필드로 정의했다.
- `summarizeRecoverySource()`의 반환 타입을 명시했다.
- UI가 암묵적인 객체 shape에 기대지 않도록 했다.
- provenance 표시 정책 내부 구현이 바뀌어도 출력 구조는 유지되게 했다.
- `RecoverySourceSummaryPolicySnapshot`과 결과 타입의 관계를 명확히 했다.
- 정책 모듈의 책임이 요약 text와 적용 policy, truncated 여부를 반환하는 것임을 드러냈다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
