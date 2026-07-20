# 33일차 - 출처 표시 메타데이터

- Provenance Disclosure Metadata는 표시된 출처 정보의 한계를 함께 드러내는 설계다.
- 요약이 유용하더라도 요약 여부를 숨기면 사용자가 정보의 범위를 오해할 수 있음을 배웠다.
- `RecoveryAttempt`에 `sourceIssueSummaryTruncated` 필드를 추가했다.
- `summarizeRecoverySource()`가 summary text와 truncated 여부를 함께 반환하도록 바꿨다.
- source issue message가 96자 이하이면 complete summary로 표시되게 했다.
- source issue message가 길면 truncated summary로 표시되게 했다.
- 복구 시도 생성 시 summary와 disclosure flag를 함께 저장했다.
- State Machine 패널에서 `complete summary`와 `truncated summary`를 구분해 표시했다.
- provenance의 내용뿐 아니라 provenance 표시 방식도 관찰 가능한 상태로 만들었다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
