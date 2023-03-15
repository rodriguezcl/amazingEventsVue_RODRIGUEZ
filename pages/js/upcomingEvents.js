import { createCardsUpcomingPast, createCategories, createChecks, filterAndPrint } from './funciones.js';

const $container = document.getElementById('container');
const $checkbox = document.getElementById('btn-group1');
const $search = document.querySelector('input[placeholder="Search"]');

let data = []
let categories = "";
async function getData() {
    let apiURL = "../../assets/amazing.json"
    fetch(apiURL)
    .then(res => res.json())
        .then(res => {
            data = res
            const filterUpcoming = data.events.filter(evento => data.currentDate < evento.date)
            createCardsUpcomingPast(filterUpcoming, $container)
            categories = createCategories(filterUpcoming)
            createChecks(categories, $checkbox)
            $search.addEventListener('keyup', () => {
                let dataFilter = filterAndPrint(filterUpcoming)
                createCardsUpcomingPast(dataFilter, $container)
            })
            
            $checkbox.addEventListener('change', () => {
                let dataFilter = filterAndPrint(filterUpcoming)
                createCardsUpcomingPast(dataFilter, $container)
            })
        })
        .catch(err => console.log(err))
}
getData();