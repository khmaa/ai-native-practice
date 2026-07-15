# 30일차 - 복구 결과 생명주기

- Recovery Outcome Lifecycle은 복구 행동의 시작과 결과를 상태로 나누는 설계다.
- 복구도 `started`, `succeeded`, `failed`, `cancelled`를 가진 작은 상태 머신으로 볼 수 있음을 배웠다.
- `RecoveryAttemptStatus` 타입을 추가했다.
- `RecoveryAttempt`에 status 필드를 추가했다.
- regenerate 복구가 성공하면 `succeeded`로 표시되게 했다.
- regenerate 복구가 다시 validation에 실패하면 `failed`로 표시되게 했다.
- 복구 요청을 취소하면 `cancelled`로 표시되게 했다.
- edit-preview 복구 후 preview 값을 수정하면 `succeeded`로 표시되게 했다.
- State Machine 패널에서 복구 상태를 label과 함께 확인할 수 있게 했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
