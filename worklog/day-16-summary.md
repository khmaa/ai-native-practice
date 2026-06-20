# 16일차 - 신선한 Feedback Context

- AI context는 존재 여부보다 현재 요청에 여전히 관련 있는지가 중요함을 배웠다.
- 이전 요청의 validation feedback이 새 요청으로 흘러가면 잘못된 방향으로 AI를 유도할 수 있다.
- 검증 실패 feedback에 원래 요청을 나타내는 `sourcePrompt`를 함께 보관했다.
- `PlanRetryFeedback` 타입으로 로컬 retry 상태와 실제 모델 요청용 `PlanFeedback`을 구분했다.
- 요청 프롬프트는 공백을 정리한 뒤 비교하도록 `normalizePrompt`를 추가했다.
- 같은 planning request를 재생성할 때만 validation feedback을 다음 요청에 포함하도록 했다.
- 사용자가 직접 작성한 feedback note는 새 요청에 대한 의도이므로 기존처럼 포함되도록 유지했다.
- 오류 UI와 입력 안내에 validation feedback의 적용 범위를 명확히 표시했다.
- 이전 검증 결과는 보관하되 관련 없는 새 요청의 AI context에는 보내지 않게 됐다.
- `npm run build`와 `git diff --check`로 TypeScript 빌드 및 변경 형식을 검증했다.
