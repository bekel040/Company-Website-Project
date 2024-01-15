let topics;
let name_value;

window.addEventListener("DOMContentLoaded", (event) => {

        topics = document.getElementById("choices");
        name_value = document.getElementById("name");
        forms_selected = document.getElementsByClassName("form");
        
        name_value.addEventListener("change", update);
        topics.addEventListener("change",update);    
       

        

});

// set price based on subscribtion chosen and given 15 % discount if name starts with the letters in "musify" (company name)

function update () {
    const out = document.getElementById("placeholder");
    let subscribtion_price = 10;
    let one_time_price = 100;
    let discounted_trail = 7;
    let price;
    
    
    if (topics.value == "monthly-subscription"){
        price = subscribtion_price;

    }
    else if (topics.value == "one-time-payment"){
        price = one_time_price;

    }
    else if(topics.value == "discounted-trial"){
        price = discounted_trail;
    }
    
    
    if (name_value.value.charAt(0) == "m" || name_value.value.charAt(0) == "u" || name_value.value.charAt(0) == "s" || name_value.value.charAt(0) == "i" || name_value.value.charAt(0) == "f" || name_value.value.charAt(0) == "y"){
        let discount = price * .15;
        price -= discount;
    }

    out.innerText = "price: $" + price;

};