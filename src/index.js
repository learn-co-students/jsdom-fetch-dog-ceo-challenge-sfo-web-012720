const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", function(){
    const dogContainer = document.getElementById("dog-image-container")
    const breedList = document.getElementById("dog-breeds")
    const breedDropDown = document.getElementById("breed-dropdown")

    const getImgs = url => {
        return fetch(url)
            .then(resp => resp.json())
            .then(data => makeImg(data))
    }   

    const makeImg = data => {
        data.message.forEach(img => {
            const newDog = document.createElement('img')
            newDog.src = img
            dogContainer.appendChild(newDog)
        });
    }

    const getBreeds = url => {
        return fetch(url)
            .then(resp => resp.json())
            .then(data => setBreeds(data))
    }

    const setBreeds = data => {
        const breeds = Object.keys(data.message)
        breeds.forEach(breed => {
            if (breed[0] == breedDropDown.value){
                newBreed = document.createElement("li")
                newBreed.textContent = breed
                newBreed.id = breed
                breedList.appendChild(newBreed)
            }
        })
    }

    const changeElementColor = event => {
        const dogBreed = document.getElementById(event.target.id)
        dogBreed.style.color = "blue"
    }

    const search = () => {
        breedList.innerHTML = ""
        getBreeds(breedUrl)
    }

    breedList.addEventListener("click", changeElementColor)
    breedDropDown.addEventListener("change", search)


    getImgs(imgUrl)
    getBreeds(breedUrl)
});



