let itemContainer = document.querySelector('#itemContainer');
let items = document.querySelectorAll('#item');
let contentContainer = document.querySelector('#contentContainer');
let exitBtn = document.querySelector('#exitBtn');

let names = document.querySelectorAll('#name');
let brands = document.querySelectorAll('#brandImg');
let firstImgs = document.querySelectorAll('#firstImg');
let secondImgs = document.querySelectorAll('#secondImg');

let isMenu = false;

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click',(e)=>ItemClick(Array.from(items).indexOf(e.currentTarget)))
}
exitBtn.addEventListener('click',ToggleItemMode);

//CenterItemContainer();
ToggleItemMode();

function CenterItemContainer(){

}

function ItemClick(i){
    ToggleItemMode();
    FocusOnItem(i);
}

function ToggleItemMode(){
    contentContainer.classList.toggle('contentContainerActive');
}

function FocusOnItem(i){
    for (let i = 0; i < names.length; i++) names[i].classList.add('hidden');
    for (let i = 0; i < brands.length; i++) brands[i].classList.add('hidden');
    for (let i = 0; i < firstImgs.length; i++) firstImgs[i].classList.add('hidden');
    for (let i = 0; i < secondImgs.length; i++) secondImgs[i].classList.add('hidden');

    names[i].classList.remove('hidden');
    brands[i].classList.remove('hidden');
    firstImgs[i].classList.remove('hidden');
    secondImgs[i].classList.remove('hidden');
}