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

function getProfiles() {
    let found = localStorage.getItem("profiles")
    console.log(found);
    if (found != null) {
        return JSON.parse(found);
    }
    localStorage.setItem("profiles", '{"profiles": []}');
    return {profiles: []};
}

function loadProfiles() {
    let selection = document.getElementById("profiles");
    let profiles = getProfiles();
    if (profiles.profiles.length < 1) return;
    selection.innerHTML = '<option value="Default">Choose Profile</option>';
    for (let i=0; i<profiles.profiles.length; i++) {
        selection.innerHTML += `<option value="${i}">${profiles.profiles[i].username}</option>`
    }
}

function loadProfile(e) {
    let profiles = getProfiles();
    let index = e.options[e.selectedIndex].value;
    let profile = profiles.profiles[index];
    document.getElementById("username").value = profile.username;
    document.getElementById("profilePicture").value = profile.profilePicture;
    document.getElementById("webhook").value = profile.webhook;
}

function addProfile() {
    // add the current config to profiles
    let data = getData();
    if (data.username == "" && data.profilePicture == "") return;
    let profile = {
        "username": data.username,
        "profilePicture": data.profilePicture,
        "webhook": data.webhook
    };

    let profiles = getProfiles();
    profiles.profiles.push(profile);
    localStorage.setItem("profiles", JSON.stringify(profiles));
    //reloads the profiles, so they show up in the selection
    loadProfiles();
}

function resetProfiles() {
    localStorage.clear()
    loadProfiles();
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

    request.send(JSON.stringify(params));
}

loadProfiles();
