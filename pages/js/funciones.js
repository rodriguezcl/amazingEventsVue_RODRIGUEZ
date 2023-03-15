const fragment = document.createDocumentFragment();
const $search = document.querySelector('input[placeholder="Search"]');

export const createCards = (array, contenedor) => {
    const noResults = document.getElementById('no-results');
    contenedor.innerHTML = ""
    array.forEach((evento) => {
        let div = document.createElement('div');
        div.innerHTML += `<div class="col">
          <div class="card h-100">
          <img src="${evento.image}" class="card-img-top" alt="...">
                      <div class="card-body">
                          <h5 class="card-title">${evento.name}</h5>
                          <p class="card-text">Category: ${evento.category}</p>
                      </div>
                      <div class="card-footer">
                          <small class="text-muted">Price: $${evento.price}</small>
                          <a type="button" class="btn btn-primary btn-sm" href="./pages/details.html?id=${evento._id}"">See more</a>
                      </div>
                      </div>
                  </div>
                  `
        fragment.appendChild(div)
    })
    contenedor.appendChild(fragment)

    if (array.length === 0) {
        noResults.classList.remove('d-none');
    } else {
        noResults.classList.add('d-none');
    }
}

export const createCardsUpcomingPast = (array, contenedor) => {
    const noResults = document.getElementById('no-results');
    contenedor.innerHTML = ""
    array.forEach((evento) => {
        let div = document.createElement('div');
        div.innerHTML += `<div class="col">
          <div class="card h-100">
          <img src="${evento.image}" class="card-img-top" alt="...">
                      <div class="card-body">
                          <h5 class="card-title">${evento.name}</h5>
                          <p class="card-text">Category: ${evento.category}</p>
                      </div>
                      <div class="card-footer">
                          <small class="text-muted">Price: $${evento.price}</small>
                          <a type="button" class="btn btn-primary btn-sm" href="./details.html?id=${evento._id}"">See more</a>
                      </div>
                      </div>
                  </div>
                  `
        fragment.appendChild(div)
    })
    contenedor.appendChild(fragment)

    if (array.length === 0) {
        noResults.classList.remove('d-none');
    } else {
        noResults.classList.add('d-none');
    }
}

export const createCategories = (array) => {
    let categories = array.map(category => category.category)

    categories = categories.reduce((acumulador, elemento) => {
        if (!acumulador.includes(elemento)) {
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories
}

export const createChecks = (array, container) => {
    array.forEach(category => {
        let div = document.createElement('div');
        div.innerHTML += `<div class="category checks-container ${category.toLowerCase()}">
                          <input class="form-check-input" type="checkbox" value="${category.toLowerCase()}" id="${category.toLowerCase()}">
                          <label class="form-check-label" for="${category.toLowerCase()}">
                              ${category}
                          </label>
      
                      </div>
                      `
        fragment.appendChild(div)
    })
    container.appendChild(fragment)
}

export const filterSearch = (array, value) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filteredArray
}

export const filterChecks = (array) => {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let filteredArray = array
    if (checked.length > 0) {
        filteredArray = []
        for (let i = 0; i < checked.length; i++) {
            filteredArray = filteredArray.concat(array.filter(e => e.category.toLowerCase().includes(checked[i].id)))
        }
    }
    return filteredArray
}

export const filterAndPrint = (array) => {
    let arrayFiltered = filterSearch(array, $search.value)
    console.log(arrayFiltered);
    arrayFiltered = filterChecks(arrayFiltered)
    return arrayFiltered
}

export const createDetails = (evento, contenedor) => {

    let div = document.createElement('div');
    div.innerHTML += `
    <div class="col">
        <div class="card h-100">
            <img src="${evento.image}" id="img-details" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">Category: ${evento.category}</p>
                <p class="card-text">Date: ${evento.date}</p>
                <p class="card-text">Description: ${evento.description}</p>
                <p class="card-text">Place: ${evento.place}</p>
                <p class="card-text">Capacity: ${evento.capacity}</p>
                <p class="card-text">Assistance: ${evento.assistance}</p>

            </div>
            <div class="card-footer">
                <small class="text-muted">Price: $${evento.price}</small>
            </div>
        </div>
    </div>
    `
    fragment.appendChild(div)
    contenedor.appendChild(fragment)
}


