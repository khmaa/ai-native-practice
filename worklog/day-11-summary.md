# 11일차 - Context 신뢰 경계 세우기

- 앱 상태에서 가져온 문자열도 모델 관점에서는 신뢰할 수 없는 입력임을 배웠다.
- 사용자가 편집한 task 제목이 instruction처럼 동작할 수 있는 위험을 살펴봤다.
- context를 시스템 지시와 섞지 않고 구조화된 task-title 데이터로 유지했다.
- 승인 task와 draft task 모두 같은 context 안전 정책을 통과하도록 만들었다.
- 한글과 영문의 명백한 instruction 형태를 감지하는 최소 필터를 추가했다.
- instruction처럼 보이는 제목은 AI 요청 context에 포함하지 않도록 했다.
- `PlanContext`에 차단된 제목 개수를 별도 메타데이터로 기록했다.
- Agent Trace에서 context의 데이터 역할과 차단 개수를 확인할 수 있게 했다.
- `npm run build`와 독립 실행 사례로 정상 제목 유지와 instruction 제목 차단을 검증했다.
- 키워드 필터는 보조 장치이며 핵심 방어선은 데이터와 지시의 구조적 분리임을 확인했다.
