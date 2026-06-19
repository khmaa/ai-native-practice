# 15일차 - 사용자 Feedback을 요청에 담기

- AI Native UI에서 사용자의 수정 의도도 중요한 feedback context가 될 수 있음을 배웠다.
- 시스템 validation feedback과 사용자가 직접 적는 feedback note를 구분해서 다루기로 했다.
- `PlanFeedback`에 선택적 `userNote` 필드를 추가했다.
- planning request 영역에 다음 생성에 전달할 feedback note 입력칸을 추가했다.
- feedback note는 최대 160자로 제한해 context가 과도하게 커지지 않도록 했다.
- `createPlanFeedback`으로 retry feedback과 사용자 note를 하나의 요청 feedback으로 병합했다.
- feedback note가 비어 있으면 요청에 포함하지 않도록 했다.
- 검증된 draft가 준비되면 feedback note를 비워 다음 요청으로 새지 않게 했다.
- Agent Trace에서 사용자 feedback이 `user:` 형태로 전달되는지 확인할 수 있게 했다.
- `npm run build`와 브라우저에서 feedback note 전달 및 성공 후 초기화를 검증했다.
