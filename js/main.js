const loadPhone= async(searchText="oppo",dataLimit)=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=  await fetch(url);
    const data= await res.json();
    displayPhone(data.data,dataLimit)
}


const displayPhone=(phone,dataLimit)=>{
    console.log(dataLimit)
    const load_phone= document.getElementById("load-phone");
    load_phone.innerHTML="";
    const showAll= document.getElementById("show-all");
   if (dataLimit && phone.length > 10) {
    phone= phone.slice(0,10);
   
    showAll.classList.remove("d-none");
    
   }
else{
    showAll.classList.add("d-none");
  
}

    // no phone 
    const not_found= document.getElementById("not_found");
if (phone.length===0) {
    not_found.classList.remove("d-none")
    spinnerLoading(false)
}
else{
    // load phone 
    phone.forEach(element => {
        
        const {brand,image,phone_name,slug}=element;
        const div= document.createElement("div");
        div.classList.add("col");
        div.innerHTML=`
        <div class="card">
        <img class="p-3" src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <h5 class="card-title">Brand: ${brand}</h5>
          <h5 class="card-title">Slug: ${slug}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button class="btn btn-primary" onclick="loadPhoneDetails('${slug}')"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
        </div>
      </div>
        `;
        load_phone.appendChild(div)
    
    });
    not_found.classList.add("d-none");
    spinnerLoading(false)
}

}

const porcessSearch=(dataLimit)=>{
    spinnerLoading(true)
    const search_phone= document.getElementById("search_phone").value;
    loadPhone(search_phone,dataLimit)
}

// search phone 
const searchPhone=()=>{
    porcessSearch(10)


}


const spinnerLoading=isLoading=>{
    const loading_spinner= document.getElementById("loading_spinner");
    if (isLoading) {
        loading_spinner.classList.remove("d-none")
    }
    else{
        loading_spinner.classList.add("d-none") 
    }
}

document.getElementById("btn-show-all").addEventListener("click",function(){
    porcessSearch()
 
})

// losd product details show 
const loadPhoneDetails= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res= await fetch(url);
    const data= await res.json();
    showProductDetails(data)
}

const showProductDetails= (data)=>{
    const loadModal=document.getElementById("loadModal");
    loadModal.innerHTML="";
const {mainFeatures,name}= data.data;

const {displaySize,memory,storage}=mainFeatures;
   const div=document.createElement("div");
   div.classList.add("modal-content");
   div.innerHTML=`
   <div class="modal-header">
     <h5 class="modal-title" id="phoneDetailsModalLabel">${name}</h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
   <p> <strong>Display Size:</strong> ${displaySize}</p>
   <p><strong>Memory:</strong> ${memory}</p>
   <p><strong>Storage: </strong> ${storage}</p>
   </div>
   <div class="modal-footer">
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    
   </div>
   
   `;
   loadModal.appendChild(div)

}

// shopw product on keypress 

document.getElementById("search_phone").addEventListener("keyup",function(e){
    porcessSearch(10);
})


loadPhone()