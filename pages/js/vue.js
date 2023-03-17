const { createApp } = Vue
const apiURL = "../../assets/amazing.json"

createApp({
    data() {
        return {
            events: undefined,
            categories: undefined
        }
    },
    created() {
        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                this.events = data.events
                this.categories =[...new Set( this.events.map(evento => evento.category))]
                console.log(this.categories);
            })
            .catch(err => console.log(err))
    },

    methods: {
filtro(){
    console.log("funciona");
}
    },
    computed: {

    }
}).mount('#app')