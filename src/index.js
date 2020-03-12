// console.log('%c HI', 'color: firebrick')

// const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
// const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// document.addEventListener('DOMContentLoaded', function() {
//     console.log('we loaded')
//     fetchDoggies();
//     fetchBreeds();
// });

// function fetchDoggies() {
//     fetch(imgUrl)
//         .then(res => res.json())
//         .then(dogs => {                        
//             dogs.message.map(dog => renderDog(dog))
//         });
// }

// function renderDog(dog) {
//     let dogContainer = document.getElementById('dog-image-container');
//     const newImg = document.createElement('img');
//     newImg.src = dog;
//     dogContainer.appendChild(newImg);
// }

// function fetchBreeds() {
//     fetch(breedUrl)
//         .then(res => res.json())
//         .then(breeds => {
//             // list of breeds
//             listOfBreeds = Object.keys(breeds.message);
//             addBreeds(breeds);
//         })
// }

// function addBreeds(breed) {
//     let breedContainer = document.getElementById('dog-breeds');
//     const newBreed = document.createElement('ul');
//     // newBreed.innerText = breed;
//     // breedContainer.appendChild(newBreed);    
// }


let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}