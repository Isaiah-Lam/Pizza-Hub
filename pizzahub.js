
// localStorage.clear();

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
        buildCart();

        if (localStorage.getItem("currentUser") == "" || localStorage.getItem("currentUser") == null) {
            $("#sign-out-btn").css("display", "none");
            $("#sign-in-btn").css("display", "flex");
        }
        else {
            $("#sign-out-btn").css("display", "flex");
            $("#sign-in-btn").css("display", "none");
        }
    }

    refreshButtons();
})

function refreshButtons(){
    $(".change-price").click(function () {
        let newPrice = Number(prompt("New item Price."))
        $(this).parent().parent().find(".item-price").text("$" + newPrice)
    })
    $(".change-name").click(function(){
        let newName = prompt("Enter this item's new name:")
        $(this).parent().parent().find(".item-title").text(newName)
    })
    $(".change-description").click(function(){
        let newDesc = prompt("Enter this item's new description:")
        $(this).parent().parent().find(".item-desc").text(newDesc)
    })
    $(".delete-item").click(function () {
        console.log("it worked")
        if(window.confirm("Are you sure?")){
            $(this).parent().parent().remove()
        }
    })
    $(".add-cart").click(function () {
        if (localStorage.getItem("currentUser") == "Manager") {
            alert("Log in as customer to purchase items");
        }
        else {
            var children = $(this).parent().children(".cart-info").clone();
            console.log(children[0].innerHTML)
            console.log(localStorage.getItem("cartItems"));
            console.log(localStorage.getItem("cartItems").indexOf(children[0].innerHTML));
            if (localStorage.getItem("cartItems").indexOf(children[0].innerHTML) == -1) {
                cartItems = cartItems + children[0].innerHTML + ":" + children[1].innerHTML + ";";
                localStorage.setItem("cartItems", localStorage.getItem("cartItems")+cartItems);
                buildCart(); 
            }
            else {
                alert("That item is already in your cart. Open cart to adjust quantity.");
            }
        }
        
    })


    $(".set-special").click(function () {
        console.log("it worked")
        let specialInfo = $(this).parent().parent().children().clone()
        let specialName = specialInfo[0].innerHTML;
        let specialPrice =specialInfo[2].innerHTML;
        console.log(specialName)
        console.log(specialPrice)
        localStorage.setItem($(this).parent().parent().parent().parent().attr('id') + "Special", specialName)
        
        
    })
}




function addNewItem(id){
    let newItemTitle = prompt("Enter the new item name:")
    let newItemPrice = prompt("Enter new item price:")
    let newItemDescription = prompt("Enter this item's description:")
    if(!(newItemTitle == "" || newItemDescription == "" || newItemPrice == "" || newItemTitle == null || newItemDescription == null || newItemPrice == null)){
        let template = $("#item-template").clone()
        let templateChildren = template.children()
        console.log(templateChildren)
        templateChildren[0].innerHTML = newItemTitle
        templateChildren[1].innerHTML = newItemDescription
        templateChildren[2].innerHTML = "$" + newItemPrice
        if (id == "#drink-items") {
            templateChildren.children(".set-special")[0].remove();
        }
        $(id).prepend(template)
        refreshButtons();
    }
}







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

// sticky nav bar color change 

window.onscroll = function() {
    var top = window.scrollY;
    if(top >= 1){
    let nav = document.querySelector('.topnav')
    nav.style['padding'] = '.5rem'
    nav.style['background-color'] = '#292929'

    var links = document.getElementsByClassName('active')
    for (let i=1; i < links.length; i++){
        links[i].style['color'] = 'white'
        links[i].style ['padding'] = '.5rem'
    }
        links[0].style ['padding'] = '.5rem'
        links[0].style ['active:hover'] = 'blue'

        let stated = document.querySelector('.cart-icon')
        stated.style['color'] = 'white'
    }

    else if(top == 0){
        let nav = document.querySelector('.topnav')
        nav.style['padding'] = '.5rem'
        nav.style['background-color'] = 'rgba(0,0,0,0.3)'

        var links = document.getElementsByClassName('active')
        for (let i=1; i < links.length; i++){
        links[i].style['color'] = 'white'
    }
        links[0].style ['color'] = 'white'

        let stated = document.querySelector('.cart-icon')
        stated.style['color'] = 'white'
    }
}
// tablinks

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

function openMenu() {
    window.open('menu.html', '_self');
    setUpManagerPages();
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
        $("#cart-container").show();
    }
}

function buildCart() {
    let i = 0;
    while (cartItems != ";" && i < cartItems.length) {
        if (cartItems[i] == ":" && i != 0) {
            var itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            let name = document.createElement("h2");
            name.innerHTML = cartItems.substring(0,i);
            $(name).css("width", "fit-content");
            itemDiv.append(name);
            cartItems = cartItems.substring(i+1);
            i = 0;
        }

        else if (cartItems[i] == ";" && i != 0) {
            let price = document.createElement("p");
            price.innerHTML = cartItems.substring(0,i);
            $(price).css("width", "fit-content");
            itemDiv.append(price);
            cartItems = cartItems.substring(i+1);
            let removeBtn = document.createElement("div");
            removeBtn.classList.add("remove-btn");
            removeBtn.onclick = function () {
                let itemName = $(this).parent().children()[0].innerHTML;
                cartItems = localStorage.getItem("cartItems");
                let stringIndex = cartItems.indexOf(itemName);
                console.log(itemName);
                console.log(stringIndex);
                cartItems = cartItems.substring(0,stringIndex) + cartItems.substring(cartItems.indexOf(";",stringIndex)+1);
                localStorage.setItem("cartItems", cartItems);
                $(this).parent().remove();
                
            };
            itemDiv.append(removeBtn);


            var quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.classList.add("item-quantity");
            quantityInput.value = "1";
            quantityInput.min = "1";
            quantityInput.onchange = function () {
                let itemPrice = Number($(this).parent().children()[1].innerHTML.substring(1));
                let totalItemPrice = itemPrice * $(this).val();
                console.log(totalItemPrice);
            }
            itemDiv.append(quantityInput);
            $("#cart-div").append(itemDiv);
            i = 0;
        }

        else {
            i++;
        }
    }
    if (localStorage.getItem("cartItems").length > 0) {

    }
}


function checkout() {
    let cart = document.getElementById("cart-div");
    $(cart).slideUp(250);
    
}

// slider home screen

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" inactive", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " inactive";
}

