/******************************************
Treehouse Techdegree:
project 5 - Public API Requests
******************************************/

const gallery = document.querySelector('.gallery')
const searchContainer = document.querySelector('.search-container')

/*
* Fetch Function: fetchData function checks the status and parses the response into json
*/
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const responseStatus = await checkStatus(response);
        return responseStatus.json();
    }
    catch (error) {
        return console.log("Looks like there was a problem", error);
    }
}

fetchData("https://randomuser.me/api/?results=12&nat=us")
    .then(employees => generateCard(employees.results))


/*
* Helper Function
*/
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(reponse.statusText));
    }
}

/*
 * Function generateCard create a card for each employee
 * Modal dialog box is opened with detailed informations 
 */
function generateCard(employees) {
    const card = employees.map(employee => `
    <div class='card'>
        <div class='card-img-container'>
            <img class="card-img" src="${employee.picture.thumbnail}">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}</p>
        </div>
    </div>
    `).join('');
    gallery.innerHTML = card;
    
    const cards = document.querySelectorAll('.card');
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            if (cards[i].contains(e.target))
                generateModal(employees, i)
        })
    }
}

/*
 * Function generateModal displays a dialog box with the details informations 
 */
function generateModal(employees, i) {
    let employee = employees[i];
    let getDate = new Date(employee.dob.date);
    let phoneDigits = employee.cell.replace(/[^\d]/g, ""); 
    let formattedPhoneNumber = phoneDigits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") 

    const modal = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${formattedPhoneNumber}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.nat} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${getDate.toLocaleDateString()}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    
    gallery.insertAdjacentHTML('afterend', modal);

    const modalContainer = document.querySelector('.modal-container')
    const closeButton = document.querySelector('.modal-close-btn');
    const closeModal = [modalContainer, closeButton]
    
    closeModal.forEach(action => {
        action.addEventListener('click', () => {
            modalContainer.remove()
        })
    });

}
