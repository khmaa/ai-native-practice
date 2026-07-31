# 42일차 - 정책 체크 진단

- Policy Check Diagnostics는 정책 예제 검증 실패 시 어떤 필드가 달랐는지 설명하는 설계다.
- pass/fail만으로는 디버깅과 복구에 충분하지 않음을 배웠다.
- `RecoverySourceSummaryContractCheck`에 `mismatchedFields`를 추가했다.
- contract example check가 actual과 expected의 차이 필드를 계산하도록 했다.
- 비교 대상에 text와 truncated 여부를 포함했다.
- 비교 대상에 policy id, limit, reason을 포함했다.
- mismatch가 없으면 passed가 true가 되도록 했다.
- State Machine 패널에 `policy diagnostics`를 표시했다.
- 모든 예제가 통과하면 diagnostics가 `none`으로 보이게 했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
