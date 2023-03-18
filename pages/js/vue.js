const { createApp } = Vue
const apiURL = "../../assets/amazing.json"

createApp({
    data() {
        return {
            events: undefined,
            eventsUpcoming: undefined,
            eventsPast: undefined,
            categories: undefined,
            categoriesUpcoming: undefined,
            categoriesPast: undefined,
            eventsFiltered: [],
            eventsFilteredUpcoming: [],
            eventsFilteredPast: [],
            valueSearch: '',
            checked: [],
            event: undefined
        }
    },
    created() {
        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                if (document.title.includes('Amazing Events | Details')) {
                    let queryString = location.search;
                    let params = new URLSearchParams(queryString);
                    let eventID = params.get("id");
                    this.event = data.events.find((element) => element._id == eventID);
                }
                this.events = data.events
                this.eventsFiltered = this.events
                this.categories = [...new Set(this.events.map(evento => evento.category))]

                this.eventsUpcoming = data.events.filter(evento => data.currentDate < evento.date)
                this.eventsFilteredUpcoming = this.eventsUpcoming
                this.categoriesUpcoming = [...new Set(this.eventsUpcoming.map(evento => evento.category))]

                this.eventsPast = data.events.filter(evento => data.currentDate > evento.date)
                this.eventsFilteredPast = this.eventsPast
                this.categoriesPast = [...new Set(this.eventsPast.map(evento => evento.category))]

            })

            .catch(err => console.log(err))
    },

    methods: {
        filtro() {
            this.eventsFiltered = this.events.filter(evento => {
                return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.valueSearch.toLowerCase())
            })
        },

        filtroUpcoming() {
            this.eventsFilteredUpcoming = this.eventsUpcoming.filter(evento => {
                return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.valueSearch.toLowerCase())
            })
        },

        filtroPast() {
            this.eventsFilteredPast = this.eventsPast.filter(evento => {
                return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.valueSearch.toLowerCase())
            })
        },

        getData() {
            let apiURL = "../../assets/amazing.json";
            fetch(apiURL)
                .then((res) => res.json())
                .then((res) => {
                    let data = res;
                    const $container = document.getElementById("mainDetails");
                    const queryString = location.search;
                    const params = new URLSearchParams(queryString);
                    const beerID = params.get("id");
                    const detail = data.events.find((element) => element._id == beerID);
                    createDetails(detail, $container);
                })
                .catch((err) => console.log(err));
        }

    },
    computed: {

    }
}).mount('#app')