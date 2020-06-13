const URL = 'http://localhost:3000/pups'
const dogBarDiv = document.querySelector('#dog-bar');
const dogInfoDiv = document.querySelector('#dog-info');


document.addEventListener("DOMContentLoaded", () => {
    renderPups();
});

function fetchPups() {
    return fetch(URL)
      .then(function (response) {
        return response.json();
      })
      .catch(function(error) {
        alert("Fetching all pups didn't work");
        console.log(error.message);
      });
}

function renderPups() {
    fetchPups()
    .then((pups) => pups.forEach(pup => {
        renderPup(pup);
    }));
}

function renderPup(pup) {
    const pupSpan = document.createElement("span");
    pupSpan.innerText = pup.name;

    pupSpan.addEventListener("click", function(e) {
        e.preventDefault();
        dogInfoDiv.innerHTML =""
        const pupDiv = document.createElement("div");
        pupDiv.setAttribute("id", pup.id)
        
        const img = document.createElement("img");
        img.setAttribute("src",pup.image);

        const pupNameH2 = document.createElement("h2");
        pupNameH2.innerText = pup.name;

        const button = document.createElement("button");
        if (pup.isGood) {
            button.innerText = "Bad Dog!"
            pupDiv.setAttribute("isGoodDog","good")
        } else {
            button.innerText = "Good Dog!"
            pupDiv.setAttribute("isGoodDog","bad")

        }
        button.addEventListener("click", function(e) {
            e.preventDefault();
            PupThatHasBeenClicked = e.target.parentNode
            patch(PupThatHasBeenClicked)
          });

        pupDiv.appendChild(img);
        pupDiv.appendChild(pupNameH2);
        pupDiv.appendChild(button);

        dogInfoDiv.appendChild(pupDiv);
      });
    dogBarDiv.appendChild(pupSpan);
}
function patch(thePup) {
    const formData = {
        isGoodDog : null,
    }
    if (thePup.isGoodDog === "good") {
        formData.isGoodDog = false
    } else {
        formData.isGoodDog = true
    }
    const configObject = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({formData})
    };
    
    return fetch(`${URL}/${thePup.id}`, configObject)
    .then(resp => resp.json())
    .then(thePup.isGoodDog = "good")
    .catch(function(error) {
        alert("The patch request to update a dogs goodness didnt work");
        console.log(error.message);
      });
}