async function fetchdata() {
    try {
        const text = document.getElementById("textbox");
        const keyword=text.value;
        const image = document.getElementById("image");
        const div=document.querySelector(".div");
        let newdata=1;
        
        const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=hk0fUQPnN8ZBHq7f8EurdA7vBAv3XehmUiqJCQ8w_Js&per_page=6`;
    
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch the resource, status: ${response.status}`);
        } else {
            const data = await response.json();
            if(newdata ===1){
                div.innerHTML="";
            }
            data.results.map((result)=>{
               const img= document.createElement("img");
                const imageUrl =result.urls.small; 
                img.src = imageUrl;
                div.appendChild(img);
            });
             text.value="";
        }
    } catch (error) {
        console.error("Error fetching data: ", error.message); // Log error message if something goes wrong
    }
}


    document.getElementById("button").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        newdata=1;
        fetchdata();
    });
    

