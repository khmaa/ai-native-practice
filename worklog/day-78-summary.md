# 78일차 - 순서 라벨 범위

- Review Order Label Scope Signal은 review order label이 어떤 UI 영역을 설명하는지 알려주는 설계다.
- 짧은 라벨은 의미를 압축하지만, 적용 범위가 없으면 사용자가 다시 추론해야 함을 배웠다.
- `RecoverySourceSummaryContractReviewOrder`에 `rationaleScope`를 추가했다.
- review order 생성 함수가 `policy health diagnostics` scope를 포함하도록 했다.
- 기존 `rationaleLabel`과 긴 rationale은 유지했다.
- State Machine 패널에 review order scope를 표시했다.
- 사용자는 review order가 policy health diagnostics를 읽는 경로라는 점을 더 빨리 파악할 수 있다.
- 새 contract group을 추가하지 않고 기존 review order 구조만 작게 확장했다.
- public repo에 민감정보를 추가하지 않았다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
