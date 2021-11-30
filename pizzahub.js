localStorage.clear();

function openCategory(id, items) {
    if($(items).css('display') === 'block') {
        $(id).css("overflow", "hidden");
        $(items).slideUp(500);
    }
    else {
        $(id).css("overflow", "initial");
        $(items).slideDown(500);
    }
}


function myFunction() {
    let x = document.getElementById("myDiv1");
    if (x.style.display === "none") {
      x.style.display = "block";
    } 
    else {
      x.style.display = "none";
    }
}

function myFunction1() {
    let y = document.getElementById("myDiv2");
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
}

function signUp() {
    let username = $("#username").val() + "";
    let password = $("#pass").val() + "";
    let confirm = $("#confirm-pass").val() + "";
    if (password != confirm) {
        alert("Passwords do not match.");
    }
    else if (localStorage.getItem(username) != null) {
        alert("Username is taken.");
    }
    else {
        localStorage.setItem(username, password);
        // redirect to home page
    }
}

function logIn() {
    let username = $("#login-username").val() + "";
    let password = $("#login-pass").val() + "";
    if (username == "Manager" && password == "PizzaHub420") {
        window.open('index.html');
        localStorage.setItem("currentUser") = "Manager";
        setUpManagerPages();
    }
    else if (localStorage.getItem(username) == password) {
        window.open('index.html');
        localStorage.setItem("currentUser") = username;
        // call function setUpCustomerPages()
    }
    else {
        alert("Incorrect username or password");

    }
}

function setUpManagerPages() {
    $(".editor-btn").each(function() {
        $(this).css("display", "block");
    })
}

function openMenu() {
    window.open('menu.html', '_self');
    setUpManagerPages();
}