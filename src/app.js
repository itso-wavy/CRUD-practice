const nameInput = document.querySelector('#product-name');
const priceInput = document.querySelector('#product-price');
const dateInput = document.querySelector('#release-date');
const stockInput = document.querySelector('#stock');
const btnGet = document.querySelector('#btn-get');
const btnPost = document.querySelector('#btn-post');
const board = document.querySelector('#board');
const form = document.querySelector('form');

function drawingBoard(product) {
  board.innerHTML = '';
  product.forEach(item => {
    const box = document.createElement('a');
    const nameTag = document.createElement('p');
    const img = document.createElement('img');
    const infobox = document.createElement('div');
    const btnbox = document.createElement('div');
    const priceTag = document.createElement('strong');
    const btnPut = document.createElement('button');
    const btnDelete = document.createElement('button');
    btnPut.textContent = '수정';
    btnDelete.textContent = '삭제';
    btnPut.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btnDelete.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    infobox.classList.add('mt-3', 'd-flex', 'justify-content-between');
    priceTag.classList.add('mr-auto');
    img.classList.add('img-fluid');
    nameTag.classList.add('mt-2');
    box.classList.add(
      'col-6',
      'col-sm-6',
      'col-lg-4',
      'mb-3',
      'container',
      'btn',
      'btn-default',
      'text-start'
    );
    box.setAttribute('href', '#');

    nameTag.textContent = item.productName;
    img.setAttribute(
      'src',
      `http://test.api.weniv.co.kr/${item.thumbnailImg}` || null
    );
    priceTag.textContent = item.price;
    const priceType = document.createElement('span');
    priceType.textContent = '원';

    priceTag.appendChild(priceType);
    box.appendChild(nameTag);
    box.appendChild(img);
    btnbox.appendChild(btnPut);
    btnbox.appendChild(btnDelete);
    infobox.appendChild(btnbox);
    infobox.appendChild(priceTag);
    box.appendChild(infobox);
    board.appendChild(box);
  });
}

// GET(생성)
async function getProductData() {
  const res = await fetch('http://localhost:3000/product');
  const product = await res.json();
  drawingBoard(product);
}

// POST(조회)
async function postProductData() {
  const res = await fetch('http://localhost:3000/product', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      productName: nameInput.value,
      price: priceInput.value,
      pubDate: dateInput.value,
      stockCount: stockInput.value,
    }),
  });
  const product = await res.json();
  console.log(product);
  drawingBoard(product);
}

// PUT(수정)

// DELETE(삭제)

// 버튼 기능 구현
btnGet.addEventListener('click', e => {
  getProductData(e);
});

btnPost.addEventListener('click', e => {
  nameInput.value && priceInput.value && dateInput.value && stockInput.value
    ? postProductData(e)
    : alert('상품정보를 입력해주세요');
});

form.addEventListener('submit', e => {
  e.preventDefault();
});
