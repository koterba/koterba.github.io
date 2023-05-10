// var input = document.getElementById("sendButton");

// // Execute a function when the user presses a key on the keyboard
// input.addEventListener("keypress", function(event) {
//   // If the user presses the "Enter" key on the keyboard
//   if (event.key === "Enter") {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     document.getElementById("sendButton").click();
//   }
// }); 

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
    let webhook = "https://discord.com/api/webhooks/1105608869553651772/E4hUu7OEW7Xn6Lze_k1QySkOas9i3aNb1Sos-sDq2mvKN5P1jC0XI6h4DuLDBZhftBSh";
    let username = "Anonymous";
    let profilePicture = "https://cdn.discordapp.com/avatars/470818471916077067/3aad9a6dc9d834be43a23c30c39fcb2f.webp?size=160";

    if (document.getElementById("username").value != "") {
        username = document.getElementById("username").value;
    }

    if (document.getElementById("profilePicture").value != "") {
        profilePicture = document.getElementById("profilePicture").value;
    }

    if (document.getElementById("webhook").value != "") {
        webhook = document.getElementById("webhook").value;
    }

    const request = new XMLHttpRequest();
    request.open("POST", webhook);
    request.setRequestHeader('Content-type', 'application/json');

    let message = document.getElementById("messageInput").value;

    const params = {
        username: username,
        avatar_url: profilePicture,
        content: message
    };

    request.send(JSON.stringify(params));

    console.log("got here");
    console.log(message);
    console.log(username);
    console.log(profilePicture);
    console.log(webhook);

    document.getElementById("messageInput").value = ""
}

