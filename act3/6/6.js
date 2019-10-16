// Crea una función que tome un array de nombres de usuario llamado usersArray,
// y un array de nombres de usuarios baneados llamado blackList,
// y que devuelva un nuevo array con los usuarios no baneados en el array inicial.
// Emplea funciones de orden superior (e.g., filter, map, reduce)



let blackMamba=["pepe","jackson","bigmama"]
let whiteChick=["penelope","jackson","alexisTexas"]


// function tiene(a, b){
// for (let i = 0; i < array.length; i++) {
    
//     if (a.includes(b[i])==true){

//     }
// }


function usersArray(malo, bueno){
        let filtrado = []
        if (malo.length == 0){
            console.log(bueno);
            
        }


        else{
                filtrado=malo.filter(x=>{
                    for (let i = 0; i < bueno.length; i++) {
        
                        if (malo.includes(bueno[i])==true){
                            
                        }

                    }
                })

        }
}


console.log(usersArray(blackManba, whiteChick));
