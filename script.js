let itemContainer = document.querySelector('#itemContainer');
let items = document.querySelectorAll('#item');
let contentContainer = document.querySelector('#contentContainer');
let exitBtn = document.querySelector('#exitBtn');

let names = document.querySelectorAll('#name');
let brands = document.querySelectorAll('#brandImg');
let firstImgs = document.querySelectorAll('#firstImg');
let secondImgs = document.querySelectorAll('#secondImg');

let counter = document.querySelector('#counter');

let isMenu = false;
let index = 0;

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click',(e)=>ItemClick(Array.from(items).indexOf(e.currentTarget)))
}
exitBtn.addEventListener('click',ToggleItemMode);
document.addEventListener('scroll',()=>CalcNumber());
addEventListener('resize',()=>CenterItemContainer());

CenterItemContainer();

function CenterItemContainer(){
    var flexWidth = itemContainer.clientWidth;
    var itemWidth = 250;
    var gap = 80;
    var extra = (flexWidth-itemWidth)%(itemWidth+gap);
    itemContainer.style.marginLeft = extra+"px";
}

function ItemClick(i){
    ToggleItemMode();
    FocusOnItem(i);
}

function ToggleItemMode(){
    contentContainer.classList.toggle('contentContainerActive');
}

function FocusOnItem(i){
    console.log(i);
    for (let i = 0; i < names.length; i++) names[i].classList.add('hidden');
    for (let i = 0; i < brands.length; i++) brands[i].classList.add('hidden');
    for (let i = 0; i < firstImgs.length; i++) firstImgs[i].classList.add('hidden');
    for (let i = 0; i < secondImgs.length; i++) secondImgs[i].classList.add('hidden');

    //names[i].classList.remove('hidden');
    //brands[i].classList.remove('hidden');
    firstImgs[i].classList.remove('hidden');
    secondImgs[i].classList.remove('hidden');
    index = i;
}

function CalcNumber(){
    var t = 1-Math.pow(1-clamp((window.scrollY/window.innerHeight)*1.2 - 0.1,0,1),6);
    var n = lerp(firstImgs[index].getAttribute('price'),secondImgs[index].getAttribute('price'),t);

    SetNumber(Math.floor(n));
}

function SetNumber(number){
    counter.innerHTML = number.toLocaleString("en-us");
}

function lerp(a, b, t) { return (1 - t) * a + t * b; }
function clamp(num, min, max){ return Math.min(Math.max(num, min), max); }