let itemContainer = document.querySelector('#itemContainer');
let items = document.querySelectorAll('#item');
let contentContainer = document.querySelector('#contentContainer');
let exitBtn = document.querySelector('#exitBtn');
let arrowUp = document.querySelector('#arrowUp');
let arrowDown = document.querySelector('#arrowDown');

let names = document.querySelectorAll('#name');
let brands = document.querySelectorAll('#brandImg');
let firstImgs = document.querySelectorAll('#firstImg');
let secondImgs = document.querySelectorAll('#secondImg');

let counter = document.querySelector('#counter');
let subCounter = document.querySelector('#subCounterContainer');

let cursor = document.querySelector('#cursor');
let cursorTexts = document.querySelectorAll('#cursorText');

let isMenu = true;
let index = 0;

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click',(e)=>ItemClick(Array.from(items).indexOf(e.currentTarget)));
    items[i].addEventListener('mouseover',(e)=>ItemHover(Array.from(items).indexOf(e.currentTarget)));
    items[i].addEventListener('mouseout',ItemLeaveHover);
}
exitBtn.addEventListener('click',ToggleItemMode);
document.addEventListener('scroll',()=>CalcNumber());
addEventListener('resize',()=>CenterItemContainer());
window.onpopstate = ToggleItemMode;
document.onmousemove = FollowMouse;

CenterItemContainer();
ItemLeaveHover();

function CenterItemContainer(){
    var flexWidth = window.innerWidth*(90/100);
    var itemWidth = Number(window.getComputedStyle(items[0]).getPropertyValue('width').replace("px",''));
    var gap =  Number(window.getComputedStyle(itemContainer).getPropertyValue('gap').replace("px",''));
    var extra = (flexWidth-itemWidth)%(itemWidth+gap)*0.5;
    itemContainer.style.marginLeft = (extra+window.innerWidth*(5/100))+"px";
}

function FollowMouse(e){
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px"
}

function ItemHover(i){
    if(!isMenu) return;
    document.body.style.cursor = "none";
    cursor.classList.add('cursorActive');
    cursorTexts[i].classList.add('cursorTextActive');
}

function ItemLeaveHover(){
    if(!isMenu) return;
    document.body.style.cursor = "url('./icons/questionmark.svg'), auto"
    cursor.classList.remove('cursorActive');
    for (let i = 0; i < cursorTexts.length; i++) {
        cursorTexts[i].classList.remove('cursorTextActive');    
    }
}

function ItemClick(i){
    ItemLeaveHover();
    ToggleItemMode();
    FocusOnItem(i);
}

function ToggleItemMode(){
    isMenu = !isMenu
    contentContainer.classList.toggle('contentContainerActive');
    itemContainer.classList.toggle('itemContainerActive');
    ItemLeaveHover();
}

function FocusOnItem(i){
    if(isMenu) return;
    document.body.style.cursor = "url('./icons/mouse_dot.svg'), auto";
    for (let i = 0; i < names.length; i++) names[i].classList.add('hidden');
    for (let i = 0; i < brands.length; i++) brands[i].classList.add('hidden');
    for (let i = 0; i < firstImgs.length; i++) firstImgs[i].classList.add('hidden');
    for (let i = 0; i < secondImgs.length; i++) secondImgs[i].classList.add('hidden');

    names[i%names.length].classList.remove('hidden');
    brands[i%brands.length].classList.remove('hidden');
    firstImgs[i%firstImgs.length].classList.remove('hidden');
    secondImgs[i%secondImgs.length].classList.remove('hidden');
    index = i;
    CalcNumber();
    window.scrollTo(0,0);
}

function CalcNumber(){
    if(isMenu) return;
    if(window.scrollY/window.innerHeight < 0.9) arrowUp.classList.add('arrowHidden');
    else arrowUp.classList.remove('arrowHidden');
    if(window.scrollY/window.innerHeight > 0.1) arrowDown.classList.add('arrowHidden');
    else arrowDown.classList.remove('arrowHidden');
    var t = 1-Math.pow(1-clamp((window.scrollY/window.innerHeight)*1.2 - 0.1,0,1),6);
    var n = lerp(firstImgs[index].getAttribute('price'),secondImgs[index].getAttribute('price'),t);

    SetNumber(Math.floor(n));
}

function SetNumber(number){
    counter.innerHTML = number.toLocaleString("en-us");
    subCounter.innerHTML = number.toLocaleString("en-US")+" ￦";
}

function lerp(a, b, t) { return (1 - t) * a + t * b; }
function clamp(num, min, max){ return Math.min(Math.max(num, min), max); }