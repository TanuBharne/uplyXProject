// ======================================================
// CONTACT FORM + LOCAL STORAGE
// ======================================================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Get values

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const message =
        document.getElementById("message").value;


    // Create response object

    const response = {

        id: Date.now(),

        name: name,

        email: email,

        message: message,

        timestamp:
            new Date().toLocaleString()

    };


    // Get old responses

    let responses =
        JSON.parse(
            localStorage.getItem("responses")
        ) || [];


    // Add new response

    responses.push(response);


    // Save JSON

    localStorage.setItem(
        "responses",
        JSON.stringify(responses)
    );


    // Show success

    formMessage.textContent =
        "Message sent successfully!";


    formMessage.style.color = "green";


    // Reset form

    contactForm.reset();

});


// ======================================================
// ADMIN LOGIN
// ======================================================

const loginForm =
    document.getElementById("loginForm");

const loginSection =
    document.getElementById("loginSection");

const responsesSection =
    document.getElementById("responsesSection");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const username =
        document.getElementById("adminUsername").value;

    const password =
        document.getElementById("adminPassword").value;


    /*
        Demo credentials.

        IMPORTANT:
        This is NOT secure authentication.
        It is only suitable for your internship
        frontend demonstration.
    */

    if (
        username === "admin" &&
        password === "12345"
    ) {

        loginSection.classList.add("hidden");

        responsesSection.classList.remove("hidden");

        loginMessage.textContent = "";

        displayResponses();

    }

    else {

        loginMessage.textContent =
            "Invalid username or password.";

        loginMessage.style.color = "red";

    }

});


// ======================================================
// DISPLAY RESPONSES
// ======================================================

function displayResponses() {

    const container =
        document.getElementById("responsesContainer");


    // Get responses

    const responses =
        JSON.parse(
            localStorage.getItem("responses")
        ) || [];


    container.innerHTML = "";


    if (responses.length === 0) {

        container.innerHTML =
            "<p>No responses received yet.</p>";

        return;

    }


    // Display each response

    responses.forEach(function(response) {

        const card =
            document.createElement("div");

        card.classList.add("response-card");


        card.innerHTML = `

            <h4>${response.name}</h4>

            <p>
                <strong>Email:</strong>
                ${response.email}
            </p>

            <p>
                <strong>Message:</strong>
                ${response.message}
            </p>

            <p>
                <strong>Time:</strong>
                ${response.timestamp}
            </p>

        `;


        container.appendChild(card);

    });

}


// ======================================================
// LOGOUT
// ======================================================

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", function() {

    responsesSection.classList.add("hidden");

    loginSection.classList.remove("hidden");

    document.getElementById("loginForm").reset();

});


// ======================================================
// LIGHT / DARK MODE
// ======================================================

const themeToggle =
    document.getElementById("themeToggle");


themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeToggle.textContent =
            "☀️ Light Mode";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    else {

        themeToggle.textContent =
            "🌙 Dark Mode";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// ======================================================
// LOAD SAVED THEME
// ======================================================

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent =
        "☀️ Light Mode";

}