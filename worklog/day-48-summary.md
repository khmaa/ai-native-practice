# 48일차 - 정책 안내 말투

- Policy Guidance Tone은 정책 안내를 사용자에게 어떤 말투로 전달할지 정하는 설계다.
- severity가 위험도라면 tone은 사용자가 체감하는 안내 분위기에 가깝다는 점을 배웠다.
- `RecoverySourceSummaryPolicyHealthGuidanceTone` 타입을 추가했다.
- guidance 객체가 `tone` 값을 함께 포함하도록 확장했다.
- `healthy` 상태는 `calm` tone으로 매핑했다.
- `degraded` 상태는 `cautious` tone으로 매핑했다.
- tone 결정은 UI가 아니라 recovery source summary 정책 모듈에서 담당하게 했다.
- State Machine 패널에 guidance tone을 표시했다.
- 사용자는 정책 안내의 주의 수준뿐 아니라 전달 분위기도 함께 확인할 수 있다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
