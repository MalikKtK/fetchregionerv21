console.log("vi er i fetchkommuner")
const urlKommuner = "https://api.dataforsyningen.dk/kommuner"
const urlPostKommune = "http://localhost:8080/kommune"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

let lstKommuner = []

async function actionFetchKommuner() {
    lstKommuner = await fetchAny(urlKommuner);
    console.log(lstKommuner)
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

let body = {}

const postKommuneRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: body
}

function postKommune(kommune) {
    body = JSON.stringify(kommune)
    console.log(body)
    postKommuneRequest.body = body;
    fetch(urlPostKommune, postKommuneRequest).catch((error) => console.log(error));
}

function actionPostAllKommuner(bth) {
    console.log("post alle regioner");
    lstKommuner.forEach(postKommune)
}


const pbFetchKommuner = document.getElementById("pbFetchKommuner")
const pbPostKommuner = document.getElementById("pbPostKommuner")
pbFetchKommuner.addEventListener('click', actionFetchKommuner)
pbPostKommuner.addEventListener('click', actionPostAllKommuner)

