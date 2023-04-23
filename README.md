# Node.js_입문 과제
항해99 입문주차 : 게시글 api 서버 제작

---

### Directory Structure

![Directory Structure](https://user-images.githubusercontent.com/128948886/232706585-9fc35b0b-6336-4a7a-83a8-507deb778d6e.png)


---

### 1. 수정, 삭제 API에서 Resource를 구분하기 위해서 Request를 어떤 방식으로 사용하셨나요? (`param`, `query`, `body`)

- 수정과 삭제를 위한 고유값이 필요하기 때문에, 과제에서 주어진 postId, commentId를 고유 값으로 설정. 
- +수정 api : 
 데이터베이스에서 데이터를 조회하기 위해 params를 통해 고유 값을 가져오고, body를 통해 사용자가 보낸 JSON값들을 가져옴.

 - +삭제 api : 
 수정 방식과 동일하게 req.params를 통해 고유 값을 가져오고, req.body를 통해 사용자가 입력한 password 값을 가져옴.

---

### 2. HTTP Method의 대표적인 4가지는 `GET`, `POST`, `PUT`, `DELETE` 가있는데 각각 어떤 상황에서 사용하셨나요?

- GET : 게시글 조회, 게시글 상세 조회, 댓글 목록 조회
- POST : 게시글 작성, 댓글 생성
- PUT : 게시글 수정, 댓글 수정
- DELETE : 게시글 삭제, 댓글 삭제

---

### 3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?

- 조회, 생성, 수정, 삭제와 같이 각 기능에 맞는 HTTP 메서드(GET,POST,PUT,DELETE)를 사용하여 express.js 미들웨어를 구성하였고, rest api 설계 규칙에 맞게 RESTful한 api를 설계하였음.

---

### 4. 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?

- 게시물, 댓글 등 각 기능 별 라우터 및 스키마 관리에 용이합니다. 
구조 분리를 하지 않을 시 오류 발생에 대한 대응이 어렵고, 효율면에서도 떨어집니다.
구조 분리를 하게 되면 에러 발생시 해당 에러 발생 구역만 확인하면 되기 때문에 유지보수에도 장점을 가지고 있습니다.# SPA_Node.js_Week2_project1
