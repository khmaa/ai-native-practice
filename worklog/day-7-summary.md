# 7일차 - AI UI 상태 머신 드러내기

- AI native UI를 단순 로딩 화면이 아니라 상태 머신으로 바라봤다.
- `Idle`, `Generating`, `Ready for review`, `Recoverable error` 상태를 정리했다.
- 각 상태에서 사용자가 할 수 있는 행동을 명확히 설명하도록 만들었다.
- `plannerState` 유틸로 상태별 label, description, allowed action을 분리했다.
- `PlannerStatePanel` 컴포넌트를 추가해 현재 AI draft 상태를 화면에 표시했다.
- 생성 중에는 취소 가능하고 적용은 불가능하다는 제약을 드러냈다.
- 검증된 draft는 preview 상태에 머물며 수정, 선택, 적용할 수 있게 설명했다.
- contract 실패 상태에서도 마지막 유효 초안이 보존되는 것을 확인했다.
- `npm run build`로 TypeScript/Vite 빌드를 검증했다.
- 브라우저에서 Idle, Generating, Ready, Recoverable error 전이를 확인했다.
