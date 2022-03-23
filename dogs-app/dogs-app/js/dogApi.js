const path= 'https://api.thedogapi.com/v1/'

class Dogs{
    constructor(){

    }
    
    async getBreeds(limit){

        const query= `breeds?limit=${limit}`
        const url= path+ query;
        
        const request= await fetch(url);

        const data = await request.json();
        
        return data;
    }
    
    async getSearchedDog(value){
        
        const query= `breeds/search?q=${value}`;
        const url= path+ query;
        
        const request= await fetch(url);
    
        const data = await request.json();

        if(data[0]){
            const newQuery= `images/search?breed_ids=${data[0].id}`;
            const newUrl= path+ newQuery;
            
            const newRequest= await fetch(newUrl);
            
            const newData = await newRequest.json();

            return [{
                ...data[0],
                image:{
                    url: newData[0].url
                }
            }];
        }
        else{
            alert('Cant find the dogo! Please enter a valid name!')
        }
    }
    
    async searchById(value){
        
    }
};
