let darkMode = false;
let btn = document.querySelector("button");

btn.addEventListener("click", () => {
    darkMode = !darkMode;

    if (darkMode) {
        document.body.style.backgroundColor = "black";
        btn.style.border = "2px solid yellow"; 
        btn.style.borderRadius = "10px";    // Example: change border radius
        btn.style.color = "white";          // Optional: text color
    } else {
        document.body.style.backgroundColor = "white";
        btn.style.border = "2px solid red";
        btn.style.borderRadius = "10px";
        btn.style.color = "white";
    }
});
