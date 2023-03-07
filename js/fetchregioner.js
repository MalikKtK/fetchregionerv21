console.log("vi er i fetchregioner")
const urlRegioner = "https://api.dataforsyningen.dk/regioner"
const urlPostRegion = "http://localhost:8080/region"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

const ddRegioner = document.getElementById("ddRegioner")
function fillRegionerDropDown(region) {
    //console.log(kom)
    const el = document.createElement("option")
    el.textContent = region.navn
    el.value = region.kode
    el.region = region
    ddRegioner.appendChild(el)
}

regionList = []
async function fetchRegioner() {
    regionList = await fetchAny(urlRegioner);
    console.log(regionList)
    regionList.forEach(fillRegionerDropDown)
}
let body = {}
const postRegionRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: body
}
function postRegioner(region) {
    body = JSON.stringify(region)
    console.log(body)
    postRegionRequest.body = body
    fetch(urlPostRegion, postRegionRequest).catch((error) => console.log(error));
}
function actionPostAllRegioner() {
    if (regionList) {
        console.log("post alle regioner")
        regionList.forEach(postRegioner)
    } else {
        console.log("tryk på fetchregion knappen fjols")
    }
}

const pbFetchRegioner = document.getElementById("pbFetchRegioner")
pbFetchRegioner.addEventListener('click', fetchRegioner)
const pbPostRegioner = document.getElementById("pbPostRegioner")
pbPostRegioner.addEventListener('click', actionPostAllRegioner)



