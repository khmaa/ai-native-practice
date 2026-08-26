# 64일차 - 계약 그룹 메타데이터

- Contract Group Metadata는 aggregate에 들어가는 계약 묶음을 id와 label로 명시하는 설계다.
- 여러 contract summary를 합산할 때 단순 문자열 이름보다 구조화된 group 정보가 더 안전함을 배웠다.
- `RecoverySourceSummaryContractGroupId` 타입을 추가했다.
- `RecoverySourceSummaryContractGroup` 타입을 추가했다.
- policy health snapshot이 `contractGroups`를 함께 포함하도록 확장했다.
- summary, guidance display, presentation metadata contract를 각각 group으로 묶었다.
- aggregate 계산은 contract group 배열을 입력으로 받게 했다.
- aggregate diagnostics는 group label을 사용해 실패 위치를 설명한다.
- State Machine 패널에 contract group id와 status를 표시했다.
- `npm run build`, diff check, 민감정보 패턴 검색으로 변경을 검증했다.
