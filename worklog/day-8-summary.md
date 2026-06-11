# 8일차 - AI Trace로 요청 흐름 관찰하기

- AI native UI에서 결과뿐 아니라 요청/응답/검증 흐름을 관찰하는 중요성을 배웠다.
- `AgentTrace` 타입을 추가해 AI 요청의 mode, request, response, validation을 기록했다.
- `summarizeUnknownResponse`로 unknown 응답의 구조를 안전하게 요약했다.
- `completeTrace`로 응답 지연 시간과 검증 결과를 함께 남기도록 했다.
- `AgentTracePanel` 컴포넌트를 추가해 trace 정보를 화면에 표시했다.
- 정상 생성 시 `valid`, `object with tasks[5]`, `passed` 상태가 보이게 했다.
- 계약 실패 테스트 시 깨진 응답 요약과 validation 실패 메시지가 보이게 했다.
- trace에는 실제 auth 정보나 API key 없이 안전한 request/response 요약만 담았다.
- `npm run build`로 TypeScript/Vite 빌드를 검증했다.
- 브라우저에서 정상 응답과 실패 응답의 trace 표시를 확인했다.
