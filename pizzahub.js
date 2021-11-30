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

function openLoginPage(evt, loginPage) {
    
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(loginPage).style.display = "block";
    evt.currentTarget.className += " active";
}





// function myFunction() {
//     let x = document.getElementById("myDiv1");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
// }
// function myFunction1() {
//     let y = document.getElementById("myDiv2");
//     if (y.style.display === "none") {
//       y.style.display = "block";
//     } else {
//       y.style.display = "none";
//     }
// }

// function myFunction2(){
//     if (myFunction = "none") {
//         myFunction1 = "block";
//     } else {
//         myFunction1 = "none"
//     }
// }

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

// function openMenu() {
//     window.open('menu.html', '_self');
//     setUpManagerPages();
// }