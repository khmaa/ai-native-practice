# 31일차 - 복구 출처 추적

- Recovery Provenance는 복구 행동이 어떤 오류에서 시작됐는지 추적하는 설계다.
- 복구 결과만 보여주면 원인 오류와의 인과관계가 끊길 수 있음을 배웠다.
- `RecoveryAttempt`에 `sourceIssueTitle` 필드를 추가했다.
- `RecoveryAttempt`에 `sourceIssueMessage` 필드를 추가했다.
- 복구 시도 생성 시 현재 issue의 title과 message를 snapshot으로 저장했다.
- regenerate 복구와 edit-preview 복구 모두 같은 출처 정보를 갖도록 했다.
- State Machine 패널에서 source issue를 확인할 수 있게 했다.
- State Machine 패널에서 source message와 source rule을 함께 확인할 수 있게 했다.
- 긴 source message가 UI를 깨지 않도록 `overflow-wrap` 스타일을 보강했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
