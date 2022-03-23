const result= document.querySelector('.result');
const buttons= document.querySelectorAll('.my-btn');
const pageNumb= document.querySelector('.pageNumb');
const pageForm= document.querySelector('.page-form');
const searchForm= document.querySelector('.search-form');
const dog= new Dogs();
let currentPage= 1;

window.addEventListener('DOMContentLoaded',()=>{
    dog.getBreeds(15)
    .then(data=>{displayData(data)})
    .catch(e=> console.error(e))
    
    // get searched dog
    searchForm.addEventListener('submit',e=>{
        e.preventDefault();
        const inputVal= searchForm.input.value;
        if(inputVal){
            dog.getSearchedDog(inputVal)
            .then(data=>{
                displayData(data);
                currentPage= 0;
                pageNumb.innerText= currentPage;
            })
            .catch(e=>console.log(e));
        }
        else{
            alert('Please enter a valid name');
        }
        searchForm.reset();
    })

    // buttons
    buttons.forEach(item=>{
        item.addEventListener('click',e=>{
            const btnClasses= e.target.classList;
            
            if(btnClasses.contains('next')){
                ++currentPage;
            }
            else if(btnClasses.contains('pre') && currentPage>1){
                --currentPage;
            }
            getCurrentPAge()
        })
    })

    // page numb
    pageForm.addEventListener('submit',e=>{
        e.preventDefault();
        const inputVal= parseInt(pageForm.input.value);
        if(0<inputVal && inputVal<13){
            currentPage= inputVal;
            getCurrentPAge();
        }
        else{
            alert('Page Numb can not be lesser than 0 and bigger than 12');
        }
        pageForm.reset();
    })
})

// get current PAge
function getCurrentPAge(){
    dog.getBreeds(currentPage*15)
            .then(data=>{
                const currentData= data.slice((currentPage-1)*15,(currentPage*15));            
                if(currentData.length>0){
                    displayData(currentData)
                    pageNumb.innerText= currentPage;
                    window.scrollTo(0, 0);
                }
                else{
                    currentPage--;
                }
            })
            .catch(e=> console.error(e))
}

// display html elements
function displayData(data){
    let htmlText='';
    data.forEach(elm => {
        htmlText+= `
        <div class="col-lg-3 col-md-6 mx-2 mt-2">
            <div class="py-3 px-1 border rounded" style="background-color: #8EE4C4;">
                <p>
                    <img style="width: 240px; height: 240px;" data-bs-toggle="collapse" href="#dogcollapse${elm.id}" role="button" aria-expanded="false" aria-controls="dogcollapse${elm.id}" src= "${elm.image.url}" alt="a cute dogo on the screen">
                    <p class="lead fw-bold text-dark">${elm.name}</p>
                </p>
                <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="dogcollapse${elm.id}">
                            <div class="card card-body bg-light p-2">
                                <ul class= "text-start px-0" style="list-style-type:none;"> 
                                    <li class=" pt-1"><span class="fw-bold">Height:</span> ${elm.height.metric}m</li>
                                    <li class=" pt-1"><span class="fw-bold">Weight:</span> ${elm.weight.metric}kg</li>
                                    <li class=" pt-1"><span class="fw-bold">Life Span:</span> ${elm.life_span}</li>
                                    <li class=" pt-1"><span class="fw-bold">Bred For:</span> ${elm.bred_for}</li>
                                    <li class=" pt-1"><span class="fw-bold">Temperament:</span> ${elm.temperament}</li>
                                </ul>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });
    result.innerHTML= htmlText;
}
