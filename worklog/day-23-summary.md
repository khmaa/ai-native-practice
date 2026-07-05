# 23일차 - 정책 규칙 ID

- 정책 버전은 정책 묶음을 식별하지만, 실패한 개별 규칙까지 설명하지는 못한다는 점을 배웠다.
- 사용자에게 보이는 message와 시스템이 추적하는 rule id를 분리했다.
- `PlannerPolicyRuleId` 타입을 추가해 안정적인 정책 규칙 ID 목록을 정의했다.
- `required-field`, `allowed-day`, `duration-format`, `unique-title` 같은 규칙 ID를 만들었다.
- AI 응답 검증 실패 결과에 `ruleId`를 포함하도록 바꿨다.
- Apply Guard 실패 결과도 같은 rule id 체계를 사용하도록 했다.
- Agent Trace에 `validationRuleId`를 추가해 실패한 정책 규칙을 기록했다.
- retry feedback에도 `validationRuleId`를 포함해 다음 요청이 어떤 규칙 실패였는지 알 수 있게 했다.
- Agent Trace 패널과 Apply Guard 오류 메시지에서 rule id를 확인할 수 있게 했다.
- `npm run build`, `git diff --check`, 민감정보 패턴 검색으로 변경을 검증했다.
