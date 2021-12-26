function init() {
    document.getElementById("textArea").style.visibility = "hidden"
}

function changeStateTextArea() {
    if (document.getElementById("textArea").style.visibility == "hidden")
        document.getElementById("textArea").style.visibility = "visible"
    else
        document.getElementById("textArea").style.visibility = "hidden"
}

function hideTextArea() {
    if (document.getElementById("textArea").style.visibility == "visible")
        document.getElementById("textArea").style.visibility = "hidden"
}
init()
document.getElementById("reject-btn").addEventListener("click", () => {
    changeStateTextArea()
})

document.getElementById("save-btn").addEventListener("click", async() => {
    hideTextArea()
    await addToUserArticle()
})

if (document.getElementById("Confirm-reject-btn") != null) {
    document.getElementById("Confirm-reject-btn").addEventListener("click", async() => {
        await rejectArticle()

    })
}
async function rejectArticle() {
    var message = document.getElementById("floatingTextarea").value
    if (message != null && message != undefined && message != "") {
        var id = document.getElementById("save-btn").getAttribute("data-uid")
        try {
            const rawResponse = await fetch(`/preview/${id}/addToUpdateRejectArticle`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "message": message })

            })
            if (rawResponse.ok) {
                window.location = "/"
            } else {
                var err_res = await rawResponse.json()

            }
        } catch (e) {
            var err_res = await rawResponse.json()

        }
    } else {
        document.getElementById("errorMess").innerText = "message can not be empty"

    }
}
async function addToUserArticle() {
    var id = document.getElementById("save-btn").getAttribute("data-uid")
    try {
        const rawResponse = await fetch(`/preview/${id}/addToUpdateUserArticle`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })
        if (rawResponse.ok) {
            window.location = "/"
        } else {
            var err_res = await rawResponse.json()

        }
    } catch (e) {
        var err_res = await rawResponse.json()

    }

}