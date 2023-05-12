const DEFAULT_PROFILES = {"profiles": [
    {"username": "Farmer Floydie", "profilePicture": "https://i.kym-cdn.com/photos/images/newsfeed/002/276/829/eb3.png","webhook": ""},
    {"username": "Chungus Floydie", "profilePicture": "https://i.kym-cdn.com/photos/images/newsfeed/002/276/852/4e3.png","webhook": ""},
    {"username": "Goku Floydie", "profilePicture": "https://i.kym-cdn.com/photos/images/newsfeed/002/276/874/6ec.png","webhook": ""},
    {"username": "Jewish Floydie", "profilePicture": "https://i.kym-cdn.com/photos/images/newsfeed/002/276/875/9f5.png","webhook": ""},
    {"username": "Trans Floydie", "profilePicture": "https://i.kym-cdn.com/photos/images/newsfeed/002/276/886/0ea.png", "webhook": ""},
    {"username": "Autism Floydie", "profilePicture": "https://i.kym-cdn.com/photos/images/newsfeed/002/276/854/9de.png", "webhook": ""}
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
    let profiles = [...DEFAULT_PROFILES.profiles, ...getProfiles().profiles];
    if (profiles.length < 1) return;
    selection.innerHTML = '<option value="Default">Choose Profile</option>';
    for (let i=0; i<profiles.length; i++) {
        if (i < DEFAULT_PROFILES.profiles.length) {
            selection.innerHTML += `<option value="${i}">PRESET: ${profiles[i].username}</option>`
        } else {
            selection.innerHTML += `<option value="${i}">${profiles[i].username}</option>`
        }
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
