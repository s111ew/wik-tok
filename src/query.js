function queryWiki() {
  fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

export default queryWiki;
