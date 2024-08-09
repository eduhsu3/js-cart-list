let cartData = [
    {
        prodID: 'prod-0001',
        img: 'images/티셔츠.jpg',
        name: '브라운스튜디오 남성용 스탠다드핏 긴팔 셔츠',
        price: 10000,
        wishCount: 1,
        remaindCount: 3,
        isChecked: true,
    },
    {
        prodID: 'prod-0002',
        img: 'images/바지.jpg',
        name: '민트스쿨 캐주얼 빅사이즈 밴딩 통바지 와이드 팬츠 30~44인치까지',
        price: 15000,
        wishCount: 2,
        remaindCount: 5,
        isChecked: true,
    },
    {
        prodID: 'prod-0003',
        img: 'images/신발.jpg',
        name: '나이키 운동화 남성 에어 모나크4 발편한 키높이 가죽 런닝화 + 신발가방',
        price: 45000,
        wishCount: 1,
        remaindCount: 7,
        isChecked: false,
    },
];

let Ul = document.querySelector('#list');
let reslut = document.querySelector('#result');

//합계산출 함수 ===========================================================================
function sumCalc() {
    let sum = cartData
        .filter((item) => item.isChecked)
        .map((item) => item.price * item.wishCount)
        .reduce((acc, cur) => acc + cur, 0);
    reslut.textContent = Number(sum).toLocaleString('Ko-KR');
}

//화면 목록 랜더링 함수 ===========================================================================
function renderList() {
    Ul.innerHTML = '';

    cartData.forEach((item, idx) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-prodid', item.prodID);

        const checkInput = document.createElement('input');
        checkInput.setAttribute('class', 'check-input');
        checkInput.setAttribute('type', 'checkbox');
        checkInput.setAttribute('id', `checkIpt_${idx}`);
        if (item.isChecked) {
            checkInput.checked = 'checked';
        }
        checkInput.addEventListener('change', function () {
            let parentLi = this.closest('li');
            let selectedItemProdID = parentLi.dataset.prodid;
            let foundItem = cartData.find((item) => item.prodID === selectedItemProdID);
            foundItem.isChecked = !foundItem.isChecked;
            renderList();
        });

        const img = document.createElement('img');
        img.setAttribute('class', 'item-image');
        img.setAttribute('src', item.img);
        img.setAttribute('alt', '');

        const name = document.createElement('span');
        name.setAttribute('class', 'item-name');
        name.textContent = item.name;

        const price = document.createElement('span');
        price.setAttribute('class', 'item-price');
        price.textContent = Number(item.price).toLocaleString('Ko-KR');

        //재고량
        const remaind = document.createElement('span');
        remaind.setAttribute('class', 'item-remaind');
        remaind.innerHTML = `<i>재고량 : ${item.remaindCount}</i>`;

        //버튼 감싸는 div
        const countWrap = document.createElement('div');
        countWrap.setAttribute('class', 'item-count');

        //수량 감소 버튼
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = `-`;
        decreaseButton.setAttribute('class', 'decrease');
        decreaseButton.setAttribute('type', 'button');
        decreaseButton.setAttribute('id', `count-down${idx}`);

        //감소 클릭시 배열 업데이트
        decreaseButton.addEventListener('click', function () {
            let parentLi = this.closest('li');
            let selectedItemProdID = parentLi.dataset.prodid;
            let foundItem = cartData.find((item) => item.prodID === selectedItemProdID);
            if (foundItem.wishCount > 1) foundItem.wishCount--;
            renderList();
        });

        //수량 출력 input
        const countText = document.createElement('input');
        countText.setAttribute('class', 'count-text');
        countText.setAttribute('type', 'text');
        countText.setAttribute('id', `countIpt_${idx}`);
        countText.setAttribute('readonly', '');
        countText.setAttribute('value', item.wishCount);

        //수량 증가버튼
        const increaseButton = document.createElement('button');
        increaseButton.textContent = `+`;
        increaseButton.setAttribute('class', 'increase');
        increaseButton.setAttribute('type', 'button');
        increaseButton.setAttribute('id', `count-up${idx}`);

        //증가 클릭시 배열 업데이트
        increaseButton.addEventListener('click', function () {
            let parentLi = this.closest('li');
            let selectedItemProdID = parentLi.dataset.prodid;
            let foundItem = cartData.find((item) => item.prodID === selectedItemProdID);
            console.log(foundItem.wishCount);
            if (foundItem.wishCount === foundItem.remaindCount) alert('구매 가능한 최대치를 선택하였습니다.');
            if (foundItem.wishCount < foundItem.remaindCount) foundItem.wishCount++;

            renderList();
        });

        countWrap.append(decreaseButton, countText, increaseButton);
        li.append(checkInput, img, name, price, remaind, countWrap);
        Ul.append(li);
    });

    sumCalc();
}

//최초 그려주기
renderList();
