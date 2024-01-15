
window.addEventListener("load", () => {
    let table = document.getElementById("table");


    
    // looks for clicks on the table
        table.addEventListener("click", function(event) {
            update(event);
        })
        
        async function update(event) {

            
            let deleteBttn = event.target; // gets the element that was clicked on 
            if (deleteBttn.type == "button"){ // checks if its the button
                const i = deleteBttn.parentElement.parentElement.rowIndex;  // gets the index of the row to be deleted 
                const contactId = deleteBttn.parentElement.parentElement.querySelector(".next_id").textContent; // id of the row t o be deleted
                

                    const ID = {id: contactId};
                    const result = await fetch("/api/contact", {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(ID)
                        
                    });

                if (result.status === 200 || result.status == 404){
                    table.deleteRow(i);
                }
                
                else {
                    console.log("delete failed");
                }

            }
            
    }


    


    





    // interval 

    function addTimeSince (){
        let table_row = document.getElementsByTagName("tr");
        for (let i= 1; i<table_row.length; i++){
            let cell = table_row[i].getElementsByTagName("td");
            let cell_value = cell[2]; // value of Date cell
            let changed_cell = cell[3]; // value of Time Until cell

            let enetered_date = cell_value.innerHTML.replace('-','/'); // to handle the case of new Date object being one day off
            let enetered_time = new Date(enetered_date);
            let current_time = new Date();
            

            let time_difference = enetered_time.getTime() - current_time.getTime();

            let Difference_In_Days = Math.floor(time_difference / (1000 * 3600 * 24)); 
            let Difference_In_Hours = Math.floor((time_difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            let Difference_In_Minutes = Math.floor((time_difference % (1000 * 60 * 60)) / (1000 * 60));
            let Difference_In_Sec = Math.floor(time_difference % (1000 * 60) / 1000);


            if (time_difference < 0){
                changed_cell.innerHTML = "Past";
            }
            else if (Number.isNaN(time_difference)){
                changed_cell.innerHTML = "";
            }
            else{
                changed_cell.innerHTML = Difference_In_Days + " days " + Difference_In_Hours + " hours " + Difference_In_Minutes + " minutes " + Difference_In_Sec +" seconds left ";
            }
            

        }



    }
    
    setInterval(addTimeSince,1000);
    

});


