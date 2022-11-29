let itemContainer = document.querySelector('#itemContainer');
let items = document.querySelectorAll('#item');
let names = document.querySelectorAll('#name');
let brands = document.querySelectorAll('#brandImg');
let firstImgs = document.querySelectorAll('#firstImg');
let secondImgs = document.querySelectorAll('#secondImg');

let isItemMode = false;

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click',(e)=>ItemClick(Array.from(items).indexOf(e.currentTarget)))
}

//CenterItemContainer();

function CenterItemContainer(){

}

function ItemClick(i){
    ToggleItemMode();
    FocusOnItem(i);
}

function ToggleItemMode(){
    if(isItemMode){
        //exit
    }else{
        //enter
    }
}

function FocusOnItem(i){

}