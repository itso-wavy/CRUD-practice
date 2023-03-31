> Table of Contents 
- [1. XMLHttpRequest 객체](#1-xmlhttprequest-객체)
  - [(1) 사용법](#1-사용법)
    - [1) 생성](#1-생성)
    - [2) 초기화](#2-초기화)
    - [3) 헤더 설정](#3-헤더-설정)
    - [4) 전송](#4-전송)
  - [(2) 예시](#2-예시)
- [2. Promise](#2-promise)
- [3. Fetch API](#3-fetch-api)
  - [(1) JSON 전송](#1-json-전송)
  - [(2) FILE 전송](#2-file-전송)
- [4. Async/Await](#4-asyncawait)


<br>

<br>


# 1. XMLHttpRequest 객체

## (1) 사용법

### 1) 생성

```js
const xhr = new XMLHttpRequest();
```

### 2) 초기화

```js
xhr.open({HTTP Method}, {url}, [?비동기 여부]);
// id로 조회 'http://localhost:3000/product/1'
// query로 조회 'http://localhost:3000/product?stockCount=0'

HTTP_Method = {
  GET: 'Create(생성)', 
  POST: 'Read(조회)',
  PUT: 'Update(수정)',
  PATCH: '일부 수정',
  DELETE: 'Delete(삭제)'
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

# 2. Promise

```js
return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        resolve(res);
      } else {
        console.error(xhr.status, xhr.statusText);
        reject(new Error(xhr.status));
      }
    };
  });
```

# 3. Fetch API

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

```js
let formData = new FormData();
let photos = document.querySelector('input[type="file"][multiple]');

formData.append('title', 'My photos');
formData.append('attachment', photos.files[0]);
/* 
다중 파일의 경우 위의 코드 대신 for문 이용
  for (let i = 0; i < photos.files.length; i++) {
    formData.append('photos', photos.files[i]);
  } 
*/

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: formData,
})
  .then(res => res.json())
  .catch(err => console.error('Error:', err))
  .then(res => console.log('Success:', JSON.stringify(res)));
```

# 4. Async/Await

```js
async function asyncTest() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF8' },
    body: JSON.stringify({
      id: 1,
      title: 'title',
      body: 'body',
      userId: 1,
    }),
  }).then(res => res.json());

  console.log('Success:', res);
}
```
