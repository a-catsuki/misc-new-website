function openNav() {
    document.getElementById("nav-overlay").style.width = "100%";
    document.getElementById("nav-bar").style.color = "black";
    document.getElementById("closebtn").classList.add("closebtn");
    document.getElementById("closebtn").style.zIndex = 22;
}

function closeNav() {
    document.getElementById("nav-overlay").style.width = "";
    document.getElementById("closebtn").classList.remove("closebtn");
    document.getElementById("nav-bar").style.color = "white";
}