# 14일차 - Validation Feedback Loop 만들기

- AI validation 실패를 막다른 오류가 아니라 다음 생성의 입력으로 볼 수 있음을 배웠다.
- 실패한 원본 응답 전체를 다시 보내지 않고 분류와 짧은 메시지만 feedback으로 남기기로 했다.
- `PlanFeedback` 타입을 추가해 feedback도 명시적인 요청 계약으로 다뤘다.
- `PlanRequest`에 선택적 `feedback` 필드를 추가했다.
- validation 실패가 발생하면 category와 message를 `retryFeedback` 상태에 저장했다.
- 다음 정상 재생성 요청이 있으면 저장된 feedback을 request에 함께 포함했다.
- 검증된 draft가 준비되면 이전 feedback을 초기화하도록 했다.
- 오류 복구 문구에 다시 생성 시 실패 이유가 feedback으로 전달된다는 설명을 추가했다.
- Agent Trace에 `Feedback` 항목을 추가해 feedback 포함 여부를 관찰할 수 있게 했다.
- `npm run build`와 브라우저에서 실패 후 다시 생성 시 feedback이 Trace에 포함되는 것을 검증했다.
