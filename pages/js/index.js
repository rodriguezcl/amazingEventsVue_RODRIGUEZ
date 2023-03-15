import { createCards, createCategories, createChecks, filterAndPrint } from './funciones.js';

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
            createCards(data.events, $container)
            categories = createCategories(data.events)
            createChecks(categories, $checkbox)
            $search.addEventListener('keyup', () => {
                let dataFilter = filterAndPrint(data.events)
                createCards(dataFilter, $container)
            })
            
            $checkbox.addEventListener('change', () => {
                let dataFilter = filterAndPrint(data.events)
                createCards(dataFilter, $container)
            })
        })
        .catch(err => console.log(err))
}
getData();
