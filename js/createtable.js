console.log("vi er i create table")

const pbCreateTable = document.getElementById("pbCreateTable")
const tblKommune = document.getElementById("tblKommune")

function createTable(kommune) {
    console.log(kommune.navn)
    if (!kommune.kode) return;

    let cellCount = 0
    let rowCount = tblKommune.rows.length
    let row = tblKommune.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn

    cell = row.insertCell(cellCount++)
    let inpHrefPhoto = document.createElement("input")
    inpHrefPhoto.type = "text"
    inpHrefPhoto.setAttribute("value", kommune.hrefPhoto)
    cell.appendChild(inpHrefPhoto)

    cell = row.insertCell(cellCount++)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        kommune.hrefPhoto = inpHrefPhoto.value;
        updateKommune(kommune)
    })
    cell.appendChild(pbUpdate)

}

async function updateKommune(kommune) {
    console.log(kommune.hrefPhoto)
    console.log(kommune)
    const response = await restUpdateKommune(kommune)
    console.log(response)
}

async function restUpdateKommune(kommune) {
    const url = "http://localhost:8080/kommune/" + kommune.kode;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }
    const jsonString = JSON.stringify(kommune);
    fetchOptions.body = jsonString;
    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);
    console.log(response);
    if (!response.ok) {
        console.log("Det gik ikke godt med update");
    };
    return response;
}



function actionCreateTable() {
    lstKommuner.forEach(createTable)
}

pbCreateTable.addEventListener('click', actionCreateTable)

