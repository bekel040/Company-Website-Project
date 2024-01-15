
document.addEventListener('DOMContentLoaded', function() {

    const darkmode = document.getElementById("darkmode");
    darkmode.addEventListener("click", toggle_style); 
    
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode == "enabled"){
        document.body.classList.add("darkmode");

    }



    function toggle_style(){
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode !== "enabled"){
            document.body.classList.add("darkmode");
            localStorage.setItem("darkMode","enabled");

        }
        else{
            document.body.classList.remove("darkmode");
            localStorage.setItem("darkMode","disabled");
        }
        
    }

    async function banner_update() {
        const response = await fetch("/api/sale");
        const input_banner = await response.json();
        const banner = document.querySelector(".main-banner");
        
        if (banner != null){ //if banner is not null we're on main page
            if (input_banner["active"] != 0){
                banner.style.display = 'block';
                const banner_content =document.getElementById("banner-content");
                

                banner_content.innerText = input_banner["saleText"];
            }
            else{
                banner.style.display = "none";
            }
            
        }
        
        
    }

    async function postSong(){
        const song_chosen = document.getElementById("banner_input");
        const message = {"message": song_chosen.value}
        const result = await fetch("/api/sale", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
            
        });

         
            const banner_status =document.getElementById("banner-status");
            if (banner_status != null){
                if (result.ok){

                banner_status.style.display = "block";

                banner_status.innerText = "Song has been set";
                }

            }

            
        
    }
    const setSongbttn = document.getElementById("setSong");
    if (setSongbttn != null){
        setSongbttn.addEventListener("click",postSong);

    }
    
    async function deleteSong(){
        const message = {"message": "song deleted"}

        const result = await fetch("/api/sale", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
            
        });
        const banner_status = document.getElementById("banner-status");
            if (banner_status != null){

            if (result.ok){
                
                banner_status.style.display = "block";

                banner_status.innerText = "Song has been deleted";
            }
        }
    }
    const deleteSongbttn = document.getElementById("deleteSong");
    if (deleteSongbttn != null){
        deleteSongbttn.addEventListener("click",deleteSong);

    }




    setInterval(banner_update, 1000);



});