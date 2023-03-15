import { createDetails } from "./funciones.js";

async function getData() {
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
getData();
