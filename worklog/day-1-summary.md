# Day 1 - AI Native Practice Kickoff

- GitHub에 `ai-native-practice` 저장소를 만들고 SSH 인증을 설정했다.
- 로컬 프로젝트를 GitHub `origin/main`과 연결하고 initial commit을 push했다.
- 백엔드 없이 동작하는 AI task planner 프로토타입을 만들었다.
- 자연어 요청을 mock AI structured output으로 변환하는 흐름을 구현했다.
- AI 제안을 editable preview 카드로 보여주고 선택 적용할 수 있게 했다.
- 적용된 작업은 app state 영역에 쌓이고 undo로 되돌릴 수 있게 했다.
- mock streaming 상태를 추가해 카드가 하나씩 생성되는 느낌을 만들었다.
- 프로젝트를 React, TypeScript, Vite 기반 구조로 전환했다.
- `npm run build`와 브라우저 확인으로 생성, 적용, undo 흐름을 검증했다.
- 다음 단계는 실제 AI-native UX 패턴을 더 작은 컴포넌트와 상태 모델로 분리하는 것이다.
