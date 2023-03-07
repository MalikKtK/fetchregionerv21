console.log("vi er i fetchkommuner fra egen database")
const urlKommuner = "http://localhost:8080/kommuner"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
let lstKommuner = []
async function actionFetchKommuner() {
    lstKommuner = await fetchAny(urlKommuner);
    lstKommuner.forEach(fillKommuneDropDown)
}
function fillKommuneDropDown(kommune) {
    //console.log(kom)
    const el = document.createElement("option")
    el.textContent = kommune.navn
    el.value = kommune.kode
    el.region = kommune
    ddKommuner.appendChild(el)
}

const pbFetchKommuner = document.getElementById("pbFetchKommuner")
pbFetchKommuner.addEventListener('click', actionFetchKommuner)

