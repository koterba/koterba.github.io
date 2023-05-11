const DEFAULT_PROFILES = {"profiles": [
    {"username": "And Rotate", "profilePicture": "https://images-ext-2.discordapp.net/external/g103JGbvZKERRUudN7pzLTm8xTyMYtMetvv6uyoVtrQ/%3Fa467448/https/i.imgflip.com/790e8y.jpg?width=462&height=417","webhook": ""},
    {"username": "RamFire", "profilePicture": "https://cdn.discordapp.com/avatars/408521590725279744/6d8f8620c162c63021abe5e81366f020.webp?size=128", "webhook": ""},
    {"username": "alan", "profilePicture": "https://cdn.discordapp.com/avatars/438418439095320586/680b0a815cdbca57141187cca52b9b70.webp?size=96", "webhook": ""}
]};

function getData() {
    let username = document.getElementById("username").value != "" ? document.getElementById("username").value : "Anonymous";
    if (username.startsWith("PRESET: ")) {
        username = username.split("PRESET: ")[1];
    }
    let data = {
        username: username,
        profilePicture: document.getElementById("profilePicture").value != "" ? document.getElementById("profilePicture").value : "https://cdn.discordapp.com/avatars/470818471916077067/3aad9a6dc9d834be43a23c30c39fcb2f.webp?size=160",
        webhook: document.getElementById("webhook").value != "" ? document.getElementById("webhook").value : "https://discord.com/api/webhooks/1105608869553651772/E4hUu7OEW7Xn6Lze_k1QySkOas9i3aNb1Sos-sDq2mvKN5P1jC0XI6h4DuLDBZhftBSh",
        message: document.getElementById("messageInput").value
    };

    // clear the message box
    document.getElementById("messageInput").value = "";

    return data;
}

function getProfiles() {
    return getOrDefault("profiles", {profiles: []});
}

function loadProfiles() {
    let selection = document.getElementById("profiles");
    let presetProfiles = {...DEFAULT_PROFILES};
    for (let i=0; i<presetProfiles.profiles.length; i++) {
        presetProfiles.profiles[i].username = `PRESET: ${presetProfiles.profiles[i].username}`;
    }
    let profiles = [...presetProfiles.profiles, ...getProfiles().profiles];
    if (profiles.length < 1) return;
    selection.innerHTML = '<option value="Default">Choose Profile</option>';
    for (let i=0; i<profiles.length; i++) {
        selection.innerHTML += `<option value="${i}">${profiles[i].username}</option>`
    }
}

function loadProfile(e) {
    let profiles = [...DEFAULT_PROFILES.profiles, ...getProfiles().profiles];
    let index = e.options[e.selectedIndex].value;
    let profile = profiles[index];
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

    let profiles = getOrDefault("profiles", {profiles: []});
    profiles.profiles.push(profile);
    set("profiles", profiles);
    //reloads the profiles, so they show up in the selection
    loadProfiles();
}

function resetProfiles() {
    clear()
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
