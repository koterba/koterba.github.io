function getData() {
    let data = {
        username: document.getElementById("username").value != "" ? document.getElementById("username").value : "Anonymous",
        profilePicture: document.getElementById("profilePicture").value != "" ? document.getElementById("profilePicture").value : "https://cdn.discordapp.com/avatars/470818471916077067/3aad9a6dc9d834be43a23c30c39fcb2f.webp?size=160",
        webhook: document.getElementById("webhook").value != "" ? document.getElementById("webhook").value : "https://discord.com/api/webhooks/1105608869553651772/E4hUu7OEW7Xn6Lze_k1QySkOas9i3aNb1Sos-sDq2mvKN5P1jC0XI6h4DuLDBZhftBSh",
        message: document.getElementById("messageInput").value
    };

    // clear the message box
    document.getElementById("messageInput").value = "";

    return data;
}

function loadCookies() {
    return document.cookie.split("; ");
}

function getProfiles() {
    let cookies = loadCookies();
    let found = cookies.find((row) => row.startsWith("profiles="))
    ?.split("=")[1];
    if (found != undefined) {
        console.log(found);
        return JSON.parse(found);
    }
    document.cookie = 'profiles={"profiles": []}';
    return {profiles: []};
}

function addProfile() {
    // add the current config to profiles
    let data = getData();
    if (data.name == "" && data.profilePicture == "") return;
    let profile = {
        "name": data.username,
        "pfp": data.profilePicture,
        "webhook": data.webhook
    };

    let profiles = getProfiles();
    profiles.profiles.push(profile);
    document.cookie = `profiles=${JSON.stringify(profiles)}`;
    console.log(document.cookie);
    // console.log(getProfiles());
}

function resetProfiles() {
    document.cookie =
        "profiles=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
}

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display == "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function sendMessage() {
    // gather inputs
    let data = getData();

    const request = new XMLHttpRequest();
    request.open("POST", data.webhook);
    request.setRequestHeader('Content-type', 'application/json');

    const params = {
        username: data.username,
        avatar_url: data.profilePicture,
        content: data.message
    };

    // request.send(JSON.stringify(params));
    console.log(data);
}

