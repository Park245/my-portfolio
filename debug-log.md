# Debug log (13주차 MVP)

## 1. AppSync 리졸버 생성 명령 실패 (2026-11-27)
- 증상: `aws appsync create-resolver` 실행 시 `aws: error: argument --field-name: expected one argument`
- 원인: 반복문에서 `set -- $pair`로 "Mutation addEntry"를 두 값으로 나누려 했으나, zsh는 bash와 달리 따옴표 없는 변수도 공백으로 나누지 않아 --type-name 하나에 전체 문자열이 들어가고 --field-name 값이 비었음
- 해결: `Mutation:addEntry` 형식으로 바꾸고 `${f%%:*}`, `${f##*:}`로 나누어 전달
- 확인: addEntry, listEntries 리졸버 ARN 2개 생성 확인

## 2. 상단 메뉴 뒤로 버튼이 비쳐 보임 (2026-11-27)
- 증상: 방명록 영역으로 스크롤한 화면 캡처에서 상단 고정 메뉴(nav) 위에 아래쪽 [Details] 버튼이 흐리게 겹쳐 보임
- 원인: nav 배경색이 rgba(255,255,255,.95)로 5% 투명해서, 스크롤된 본문 요소가 메뉴 뒤로 비쳐 보였음
- 해결: nav 배경을 불투명한 #fff로 변경 후 S3 재업로드, CloudFront 무효화
- 확인: 같은 위치에서 다시 캡처해 겹침이 사라진 것 확인

## 3. 검증 안내 문구가 다시 입력해도 남아 있음 (2026-11-27)
- 증상: 메시지 200자 초과로 "Message must be 200 characters or fewer."가 표시된 뒤, 이름과 메시지를 올바르게 다시 입력해도 빨간 안내 문구가 그대로 남아 있음 (저장 버튼을 누르기 전까지)
- 원인: 안내 문구(#msg)를 지우는 코드가 submit 처리 안에만 있었음
- 해결: 이름, 메시지 입력창에 input 이벤트를 추가해 다시 입력하면 안내 문구를 바로 지우도록 수정, S3 재업로드 후 CloudFront 무효화
- 확인: 검증 오류 후 다시 입력한 화면에서 안내 문구가 사라진 것 확인
