const board = document.querySelector('#board');
const nameInput = document.querySelector('#product-name');
const priceInput = document.querySelector('#product-price');
const dateInput = document.querySelector('#release-date');
const stockInput = document.querySelector('#stock');
const btnGet = document.querySelector('#btn-get');
const btnPost = document.querySelector('#btn-post');
const form = document.querySelector('form');

function renderBoard(product) {
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
    btnPut.setAttribute('onclick', 'putProductData(this)');
    btnPut.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btnDelete.setAttribute('onclick', 'deleteProductData(this)');
    btnbox.setAttribute('data-id', item.id);
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
      'text-start'
    );
    box.setAttribute('href', '#');

    nameTag.textContent = item.productName;
    img.setAttribute('src', `http://test.api.weniv.co.kr/${item.thumbnailImg}`);

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

// GET(조회)
async function getProductData() {
  const res = await fetch('http://localhost:3000/product');
  const product = await res.json();
  renderBoard(product);
}

// POST(생성)
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
  renderBoard(product);
}

// PATCH(일부 수정)
function putProductData(obj) {
  btnPost.classList.toggle('btn-warning');
  btnPost.textContent = '수정하기';
  btnPost.addEventListener('click', async () => {
    const id = obj.parentElement.dataset.id;
    const res = await fetch(`http://localhost:3000/product/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        productName: nameInput.value,
        price: priceInput.value,
        pubDate: dateInput.value,
        stockCount: stockInput.value,
      }),
    });
    const product = res.json();
    renderBoard(product);
  });
}

// DELETE(삭제)
async function deleteProductData(obj) {
  const id = obj.parentElement.dataset.id;
  fetch(`http://localhost:3000/product/${id}`, {
    method: 'DELETE',
  });
}

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
