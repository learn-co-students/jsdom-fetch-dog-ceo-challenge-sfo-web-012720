let breeds = []

document.addEventListener('DOMContentLoaded', function (){
    fetchImgs();
    loadBreeds();
})

function fetchImgs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(res => {
        res.message.forEach(image => addImg(image))
    });
}

function addImg(dogPic) {
    let dogCont = document.querySelector('#dog-image-container')
    let newImg = document.createElement('img');
    newImg.src = dogPic;
    dogCont.appendChild(newImg);
}

function loadBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(res => {
        breeds = Object.keys(res.message);
        updateBreeds(breeds);
        addBreedListener();
    })
}

function updateBreeds(breeds){
    let b = document.querySelector('#dog-breeds');
    removeChildren(b);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(c) {
    let child = c.lastElementChild;
    while (child) {
        c.removeChild(child);
        child = c.lastElementChild;
    }
}

function selectBreedsByLetter(letter) {
    updateBreeds(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedListener() {
    let breedDrop = document.querySelector('#breed-dropdown');
    breedDrop.addEventListener('change', function(e) {
        selectBreedsByLetter(e.target.value)
    })
}

function addBreed(breed) {
    let b = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    b.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(e) {
    e.target.style.color = 'green';
}

