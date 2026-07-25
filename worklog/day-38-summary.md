# 38일차 - 출처 표시 정책 모듈

- Provenance Display Policy Module은 표시 정책을 화면 내부가 아니라 독립 모듈로 다루는 설계다.
- 표시 정책도 앱 계약이라면 재사용 가능한 경계에 있어야 함을 배웠다.
- `src/lib/recoverySourceSummaryPolicy.ts` 파일을 추가했다.
- `recoverySourceSummaryPolicy` snapshot을 새 정책 모듈로 이동했다.
- `summarizeRecoverySource()` helper를 새 정책 모듈로 이동했다.
- App은 복구 출처 요약 정책의 limit과 reason을 직접 알지 않게 됐다.
- App은 `summarizeRecoverySource()` 결과만 사용해 `RecoveryAttempt`를 만든다.
- 기존 `RecoverySourceSummaryPolicySnapshot` 타입과 UI 표시는 그대로 유지했다.
- provenance 표시 정책을 다른 trace나 panel에서도 재사용할 수 있는 구조로 만들었다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
