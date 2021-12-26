function signInButtonClicked() {
    var userName = document.getElementById("floatingInput").value
    var password = document.getElementById("floatingPassword").value
    document.querySelector(".loadingBar").style.visibility = "visible"
    sign(userName, password)
}
async function sign(userName, password) {
    try {
        const rawResponse = await fetch("/signInApi", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            })
        })
        if (rawResponse.ok) {
            window.location = "/"
        } else {
            var err_res = await rawResponse.json()
            document.getElementById("message").innerText = err_res.message
        }
    } catch (e) {
        var err_res = await rawResponse.json()
        document.getElementById("message").innerText = err_res.message
    }
    document.querySelector(".loadingBar").style.visibility = "hidden"
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}