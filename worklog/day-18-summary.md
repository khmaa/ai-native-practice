# 18일차 - 상태의 출처

- AI Native 앱에서 `Apply`는 AI draft가 사용자 승인을 거쳐 앱 상태가 되는 경계임을 배웠다.
- 앱 상태에는 결과값만 아니라 그 값이 어디서 왔는지에 대한 최소 출처가 필요하다.
- 승인된 task에 붙일 `ApprovedTaskSource` 타입을 추가했다.
- provenance에는 AI draft 여부, 원래 prompt, trace mode, 승인 시각을 저장하도록 했다.
- task 적용 시점에 현재 Agent Trace를 기반으로 source snapshot을 만들었다.
- source 정보는 AI 응답이 아니라 프론트엔드가 가진 trace와 승인 시점에서 구성했다.
- `ApprovedTask` 타입을 확장해 적용된 task가 항상 source를 가지도록 했다.
- App State 패널에서 승인된 task마다 provenance 요약을 표시했다.
- provenance 라벨은 보조 정보로 읽히도록 작은 텍스트 스타일을 추가했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
