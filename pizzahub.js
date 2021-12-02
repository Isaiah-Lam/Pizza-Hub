
var cartItems;

$(document).ready(function() {
    $("#cart-container").hide();
    if (localStorage.getItem("currentUser") == "Manager") {
        setUpManagerPages();
        $("#sign-out-btn").css("display", "flex");
        $("#sign-in-btn").css("display", "none");
    }
    else {

        setUpCustomerPages();

        if (localStorage.getItem("cartItems") == null) {
            localStorage.setItem("cartItems", "");
        }
        cartItems = localStorage.getItem("cartItems");

        if (localStorage.getItem("currentUser") == "" || localStorage.getItem("currentUser") == null) {
            $("#sign-out-btn").css("display", "none");
            $("#sign-in-btn").css("display", "flex");
        }
        else {
            $("#sign-out-btn").css("display", "flex");
            $("#sign-in-btn").css("display", "none");
        }
    }

    $(".add-cart").click(function () {
        var children = $(this).parent().children(".cart-info").clone();
        cartItems = cartItems + children[0].innerHTML + ":" + children[1].innerHTML + ",";
        localStorage.setItem("cartItems", localStorage.getItem("cartItems")+cartItems);
        console.log(cartItems);
        buildCart();
    })

})

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
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
    }
}

function logIn() {
    let username = $("#login-username").val() + "";
    let password = $("#login-pass").val() + "";
    if (username == "Manager" && password == "password") {
        localStorage.setItem("currentUser", "Manager");
        window.location.href = "index.html";
    }
    else if (localStorage.getItem(username) == password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
    }
    else {
        alert("Incorrect username or password");
    }
}

function signOut() {
    localStorage.setItem("currentUser", "");
    window.location.href = "index.html";
}

function setUpManagerPages() {
    $(".editor-btn").each(function() {
        $(this).css("display", "block");
    });
}

function setUpCustomerPages() {
    $(".editor-btn").each(function() {
        $(this).css("display", "none");
    });
}

function openCart() {
    if ($("#cart-container").css("display") == "block") {
        $("#cart-container").hide();
    }
    else {
        buildCart();
        $("#cart-container").show();
    }
}

function buildCart() {
    console.log("start");
    let i = 0;
    while (cartItems != "," && i < cartItems.length) {
        if (cartItems[i] == ":" && i != 0) {
            var itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.append(cartItems.substring(0,i));
            cartItems = cartItems.substring(i+1);
            i = 0;
        }
        else if (cartItems[i] == "," && i != 0) {
            itemDiv.append(cartItems.substring(0,i));
            cartItems = cartItems.substring(i+1);
            $("#cart-container").append(itemDiv);
            i = 0;
        }
        else {
            console.log(i);
            i++;
        }
    }
}