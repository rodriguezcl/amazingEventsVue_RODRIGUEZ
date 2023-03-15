import { createCategories } from './funciones.js';

let data = []
let categories = [];

async function getData() {
    let apiURL = "../../assets/amazing.json"
    fetch(apiURL)
        .then(res => res.json())
        .then(res => {
            data = res
            const filterUpcoming = data.events.filter(evento => data.currentDate < evento.date)
            const filterPast = data.events.filter(evento => data.currentDate > evento.date)
            let arrayPast = [];
            filterPast.filter(evento => arrayPast.push(
                {
                    percentage: ((evento.assistance * 100) / evento.capacity).toFixed(1),
                    name: evento.name,
                    assistance: evento.assistance,
                    capacity: evento.capacity,
                    category: evento.category,
                    price: evento.price,
                    revenues: evento.assistance * evento.price
                }))
            let arrayUpcoming = [];
            filterUpcoming.filter(evento => arrayUpcoming.push(
                {
                    percentage: ((evento.estimate * 100) / evento.capacity).toFixed(1),
                    name: evento.name,
                    estimate: evento.estimate,
                    capacity: evento.capacity,
                    category: evento.category,
                    price: evento.price,
                    revenues: evento.estimate * evento.price
                }))

            function printTablaInicial() {
                let listaOrdPast = "";
                listaOrdPast = arrayPast.filter(p => p.percentage).sort((a, b) => b.percentage - a.percentage)

                let listaOrdCapacidad = "";
                listaOrdCapacidad = data.events.filter(evento => evento.capacity).sort((a, b) => b.capacity - a.capacity)

                let tablaParte1 = `                        
                            <td>${listaOrdPast[0].name + " " + "(" + listaOrdPast[0].percentage}%)</td>
                            <td>${listaOrdPast[listaOrdPast.length - 1].name + " " + "(" + listaOrdPast[listaOrdPast.length - 1].percentage}%)</td>
                            <td>${listaOrdCapacidad[0].name + " (Capacity: " + (listaOrdCapacidad[0].capacity).toLocaleString()})</td>
                        `
                document.querySelector('#tablaParte1').innerHTML = tablaParte1
            }
            printTablaInicial()

            function printTablaUpcoming() {
                categories = createCategories(filterUpcoming)
                let porCategoriaUpc = [];
                let ingresosPorcentajes = [];
                categories.forEach(cat => {
                    porCategoriaUpc.push({
                        categoria: cat,
                        data: arrayUpcoming.filter(datos => datos.category == cat)
                    })
                })
                porCategoriaUpc.map(datos => {
                    ingresosPorcentajes.push({
                        category: datos.categoria,
                        estimate: datos.data.map(item => item.estimate),
                        capacity: datos.data.map(item => item.capacity),
                        estimateRevenue: datos.data.map(item => item.estimate * item.price)
                    })
                })
                ingresosPorcentajes.forEach(cat => {
                    let totalEstimate = 0
                    cat.estimate.forEach(estimate => totalEstimate += Number(estimate))
                    cat.estimate = totalEstimate

                    let totalCapacityFut = 0
                    cat.capacity.forEach(capacity => totalCapacityFut += Number(capacity))
                    cat.capacity = totalCapacityFut

                    let totalEstimateRevenue = 0
                    cat.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue))
                    cat.estimateRevenue = totalEstimateRevenue

                    cat.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityFut).toFixed(1)
                })
                let listOrdCatUpc = ""
                listOrdCatUpc = ingresosPorcentajes.filter(cat => cat.porcentajeAttendace).sort((a, b) => b.porcentajeAttendace - a.porcentajeAttendace)

                let tablaParte2 = "";
                listOrdCatUpc.forEach(e => {
                    e.listOrdCatUpc
                    tablaParte2 += `
                    <tr>
                    <td>${e.category}</td>
                    <td>USD $ ${(e.estimateRevenue).toLocaleString()}</td>
                    <td>${e.porcentajeAttendace}%</td>
                  </tr>`
                    document.querySelector('#tablaParte2').innerHTML = tablaParte2
                })
            }
            printTablaUpcoming()

            function printTablaPast() {
                categories = createCategories(filterPast)
                let porCategoriaPast = [];
                let ingresosPorcentajes = [];
                categories.forEach(cat => {
                    porCategoriaPast.push({
                        categoria: cat,
                        data: arrayPast.filter(datos => datos.category == cat)
                    })
                })

                porCategoriaPast.map(datos => {
                    ingresosPorcentajes.push({
                        category: datos.categoria,
                        assistance: datos.data.map(item => item.assistance),
                        capacity: datos.data.map(item => item.capacity),
                        revenue: datos.data.map(item => item.assistance * item.price)
                    })
                })

                ingresosPorcentajes.forEach(cat => {
                    let totalAssistance = 0
                    cat.assistance.forEach(assistance => totalAssistance += Number(assistance))
                    cat.assistance = totalAssistance

                    let totalCapacity = 0
                    cat.capacity.forEach(capacity => totalCapacity += Number(capacity))
                    cat.capacity = totalCapacity

                    let totalRevenue = 0
                    cat.revenue.forEach(revenue => totalRevenue += Number(revenue))
                    cat.revenue = totalRevenue

                    cat.porcentajeAttendace = ((totalAssistance * 100) / totalCapacity).toFixed(1)
                })
                let listOrdCatPast = ""
                listOrdCatPast = ingresosPorcentajes.filter(cat => cat.porcentajeAttendace).sort((a, b) => b.porcentajeAttendace - a.porcentajeAttendace)

                let tablaParte3 = "";
                listOrdCatPast.forEach(e => {
                    e.listOrdCatUpc
                    tablaParte3 += `
                    <tr>
                    <td>${e.category}</td>
                    <td>USD $ ${(e.revenue).toLocaleString()}</td>
                    <td>${e.porcentajeAttendace}%</td>
                  </tr>`
                    document.querySelector('#tablaParte3').innerHTML = tablaParte3
                })
            }
            printTablaPast()


        })
        .catch(err => console.log(err))
}
getData();