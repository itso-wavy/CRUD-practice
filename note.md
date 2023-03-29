# 1. XMLHttpRequest 객체

## (1) 사용법

### 1) 생성

```js
const xhr = new XMLHttpRequest();
```

### 2) 초기화

```js
xhr.open({HTTP Method}, {url}, [?비동기 여부]);

HTTP_Method = {
  GET: '요청',
  POST: '생성',
  PUT: '수정',
  PATCH: '일부 수정',
  DELETE: '삭제'
}
```

### 3) 헤더 설정

```js
xhr.setRequestHeader(content - type, { MIME });
// 전송 데이터 타입(MIME타입) 선언

MIME = {
  json: 'application/json',
  텍스트: 'text/plain',
  파일: 'multipart/form-data',
};
```

### 4) 전송

```js
xhr.send({ 전송데이터 });
// => POST,PUT,PATCH 사용시 데이터가 request의 body에 담기게 됨
```

## (2) 예시

- GET

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
xhr.send();
```

- POST

```js
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringify(data));
```

- PUT

```js
const xhr = new XMLHttpRequest();
xhr.open('PUT', 'https://jsonplaceholder.typicode.com/posts/1');
xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
xhr.send(JSON.stringify(data));
```

- DELETE

```js
const xhr = new XMLHttpRequest();
xhr.open('DELETE', 'https://jsonplaceholder.typicode.com/posts/1');
xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
xhr.send();
```

```js
const data = {
  id: 1,
  title: 'XMLHttpRequest',
  author: 'wavy',
};

xhr.onload = () => {
  if (xhr.status === 200) {
    const res = JSON.parse(xhr.response);
    console.log(res);
  } else {
    // 에러처리
    console.error(xhr.status, xhr.statusText); // 응답 상태코드 + 메시지
  }
};
```

# 2. Fetch API(Promise)

## (1) JSON 전송

```js
const data = {
  id: 1,
  title: 'my-diary',
  body: 'blabla',
};
```

- GET

```js
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json()) // promise 반환
  .then(json => console.log(json));
```

- POST

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
})
  .then(res => res.json())
  .then(json => console.log(json));
```

- PUT

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  headers: {
    'content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.srtingify(data),
})
  .then(res => res.json())
  .then(json => console.log(json));
```

- DELETE

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});
```
## (2) FILE 전송

