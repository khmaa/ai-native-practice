# 25일차 - 규칙 기반 복구 UX

- rule metadata는 trace에만 남는 정보가 아니라 실제 복구 UX에도 연결되어야 함을 배웠다.
- AI validation error UI가 실패한 rule id를 기반으로 metadata를 조회하도록 했다.
- validation 실패 메시지에 `rule id · label`을 함께 표시했다.
- `getPlannerPolicyRule`을 사용해 rule의 설명과 복구 힌트를 가져오도록 했다.
- schema 실패와 semantic 실패의 UX 구분은 유지했다.
- 두 실패 흐름 모두 rule description과 recovery hint를 recovery 문장에 포함하도록 했다.
- 같은 요청을 재생성할 때만 실패 이유가 feedback으로 전달된다는 안내를 유지했다.
- Apply Guard 오류도 `Recovery:` 접두로 rule 기반 복구 안내임을 더 명확히 했다.
- 사용자에게 왜 막혔는지와 무엇을 고치면 되는지가 더 선명해졌다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
