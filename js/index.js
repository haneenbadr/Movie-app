
var contant=document.querySelector('.contant')
var arr=[];
var links=document.querySelectorAll('.navbar .nav-link');
var search=document.getElementById('searchinput')
var mname=document.getElementById('name');
var email=document.getElementById('email');
var age=document.getElementById('age');
var phone=document.getElementById('phone');
var password=document.getElementById('password');
var repassword=document.getElementById('repassword');

var myReq=new XMLHttpRequest();
myReq.open('GET','https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
myReq.send();
    
myReq.addEventListener('readystatechange', function(){

    if(myReq.readyState == 4 && myReq.status ==200){
       
        var response=JSON.parse(myReq.response)
        arr= response.results;
         displayData();
         console.log(response);
    }
   else{
    console.log(myReq.readyState,myReq.status ==200)
   }
})


for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
        getData(e.target.innerText)
    })
}






function getData(x){
      myReq=new XMLHttpRequest();
    myReq.open('GET','https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44');

    if(x=='Now playing'){
        myReq.open('GET','https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    }
    else if(x=='Popular'){
        myReq.open('GET','https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    }
    else if(x=='Top rated'){
        myReq.open('GET','https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    }
    else if(x=='Trending'){
        myReq.open('GET','https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    }
    else  {
        myReq.open('GET','https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    }
  
    myReq.send();
    
    myReq.addEventListener('readystatechange', function(){
    
        if(myReq.readyState == 4 && myReq.status ==200){
           
            var response=JSON.parse(myReq.response)
            arr= response.results;
             displayData();
             console.log(response);
        }
       else{
        console.log(myReq.readyState,myReq.status ==200)
       }
    })
    
}



function displayData(){

    var divs='';
    for(var i=0;i<arr.length;i++){
divs+=`
<div class="col-md-4">
                <div class=" box position-relative   ">
                  <div class="img-style"> <img src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" style="width: 100%;" alt=""></div> 
                    <div class=" d-flex flex-column justify-content-center align-items-center" id="por-layer">
                        <h2 class="name mb-auto text-center">${arr[i].original_title}</h2>
                        <p class="review me-auto">${arr[i].overview}</p>
                        <p class="date me-auto">Release Date:${arr[i].release_date}</p>
                        <h3 class="rate me-auto"><i class="fa-solid fa-star  text-warning"></i>
                        <i class="fa-solid fa-star  text-warning"></i>
                        <i class="fa-solid fa-star  text-warning"></i>
                        </h3>
                        <h3 class="circle me-auto rate animate__animated vote animate__slideOutLeft">${ parseFloat(Number(arr[i].vote_average)).toFixed(1)}</h3>
                        
                           
                       </div>
                   </div>
                </div>
`
    }
    contant.innerHTML=divs;
   
}


function searchMovie(){
   var searchWord=search.value;
    
    myReq.open('GET',`https://api.themoviedb.org/3/search/movie?query=${searchWord}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`);
   myReq.send();
       
   myReq.addEventListener('readystatechange', function(){
   
       if(myReq.readyState == 4 && myReq.status ==200){
          
           var response=JSON.parse(myReq.response)
           arr= response.results;
            displayData();
            console.log(response);
       }
      else{
       console.log(myReq.readyState,myReq.status ==200)
      }
   })
   
   
   for(var i=0;i<links.length;i++){
       links[i].addEventListener('click',function(e){
           getData(e.target.innerText)
       })
   }
   
    
}

// search.addEventListener('click',function(){
//     searchMovie();
// });


function validateName(){

var NameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/ ;

var  pname=mname.value;

if (NameRegex.test(pname)) {
 
mname.classList.add('is-valid');
mname.classList.remove('is-invalid');
} 

else {  
 
mname.classList.add('is-invalid');
mname.classList.remove('is-valid');
 }
}

mname.addEventListener('keyup',validateName);