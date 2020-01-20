/**
 * Variables globales para el script. Leer la descripción
 * para entender qué valores contienen
 */
//Contiene el número de filas que se mostrarán en la galería
let rowsLibrary = 3;
//Contiene el número de columnas que se mostrarán en la galería
let columnsLibrary = 2;
/*Es un array de objetos JS que contiene un objeto de información
por cada carta del juego. Conviene echar un vistazo a uno de estos objetos
para observar la información asociada a cada carta. NO DEBES RELLENARLO TU.
EL CÓDIGO EXISTENTE YA SE ENCARGA DE ELLO*/ 
let cardData = [];
/*Es un array de objetos JS que contendrá un objeto por cada carta seleccionada
por el usuario. DEBES GESTIONARLO TU*/
let currentDeck = [];
/*Es una variable global que determina la página de la galería en la cual nos encontramos.
DEBES GESTIONARLO TU. Va desde 0 hasta n-1*/
let currentPage = 0;
/*Es una variable global que contiene el número total de páginas de la galería. NO DEBES
RELLENARLO TU*/
let totalNumberPages = 0;
/*URL Base para las imágenes de las cartas que se emplean en la galería. Lo tendrás que emplear
junto con el ID de la carta y la extensión .png para crear las imágenes de las cartas*/
let cardBaseURL = "https://art.hearthstonejson.com/v1/render/latest/esES/256x/"
/*URL Base para las imágenes preview que se emplean en el menú derecho. Lo tendrás que emplear
junto con el ID de la carta y la extensión .png para crear las imágenes de fondo*/
let tilesBaseURL = 'https://art.hearthstonejson.com/v1/tiles/';

/**
 * Función empleada para calcular el total de páginas en la librería
 * atendiendo al número de columnas y filas por cada página. NO TOCAR.
 */
function getTotalNumberPages() {
    let totalCards = cardData.length;
    totalNumberPages = Math.ceil(totalCards / (rowsLibrary * columnsLibrary));
    return totalNumberPages;
}




/**
 * Función que dado un identificador de carta, devuelve el objeto de JS que se encuentra en la colección de cartas
 * y coincide con el id pasado por parámetro.
 */

// UNO
function getCardInformation(card_id) {
    //Tu código a partir de aquí
    for (let i = 0; i < cardData.length; i++) {
        if (cardData[i].id== card_id) {
            return cardData[i]
        }
    }
       
}




/**
 * Función encargada de actualizar el HTML correspondiente al total de cartas seleccionadas
 * para la baraja actual. Asumir que currentDeck está actualizado.
 */

// DOS
function updateTotalCards(){
    //Tu código a partir de aquí

let total=document.getElementById("card_count")
total.textContent=currentDeck.length + 1;
}

/**
 * Función encargada de actualizar el HTML relativo al paginador, el cual muestra
 * el número de página actual. Asumir que currentPage ya tiene la página actual.
 */
function updatePager() {
    //Tu código a partir de aquí

let pagactual=document.getElementById("pager").firstElementChild
pagactual.textContent="page "+currentPage+" of "+totalNumberPages


}

/**
 * Función encargada de actualizar el HTML correspondiente a la media del coste de la baraja creada.
 * Asumir que currentDeck está actualizado.
 */
function updateAverage(){
    //Tu código a partir de aquí
    let total=0
    for (let i = 0; i < cardData.length; i++) {
        total=total + cardData[i].cost
        
    }
    let valor=total/(cardData.length + 1)
    return valor


}


/**
 * Función encargada de crear el HTML asociado a la descripción de texto que aparece junto a cada carta.
 * @param {object} cardJSON objeto que contiene la información de la carta cuya descripción (campo flavor) debe crearse 
 */
function createCardInformation(cardJSON) {

    let description = cardJSON.flavor
    let cardinfo = document.createElement('div');
    cardinfo.textContent = cardJSON.flavor
    cardinfo.className = 'cardinfo'

        return cardinfo

}

/**
 * Función encargada de crear el HTML asociado a una carta dentro de la galería.
 * @param {object} cardJSON objeto que contiene la información de la carta a presentar en la galería 
 */
function createCardHTML(cardJSON) {

    let cardHTML = document.createElement('div')
    cardHTML.className = 'card_container'

    let imagen = document.createElement('img')
    imagen.className = 'card_image'
    imagen.id = cardJSON.id
    imagen.src = cardBaseURL + cardJSON.id + '.png'
    cardHTML.appendChild(imagen)
    cardHTML.appendChild(createCardInformation(cardJSON))

        return cardHTML

}

/**
 * Función encargada de borrar y crear la galería de cartas atendiendo al número de página actual, al 
 * número de columnas en la galería, y al número de filas.
 */
function createCanvasContent() {
    
    document.getElementById('card_canvas').innerHTML = ''
    let lola = currentPage * 6
    console.log(lola, lola + 6, cardData.length);
    
    for (let i = lola; i < Math.min(lola + 6, cardData.length); i++){

        let nuevaCarta = cardData[i];
        let eso = createCardHTML(nuevaCarta)
        let card_canvas = document.getElementById('card_canvas')
        card_canvas.appendChild(eso)

    }
}

/**
 * Esta función se encarga de inicializar la interfaz gráfica de usuario una vez recibidos
 * los datos de las cartas desde la API pública.
 */
function initializeInterface() {

    updatePager();
    createCanvasContent();

    document.getElementById("card_canvas").addEventListener("click", (event) => {

        let tabla = document.getElementById("card_table")

        let carta = getCardInformation(event.target.id)

        let cartadiv = document.createElement('div')

        cartadiv.className = "card_tile"
        cartadiv.textContent = carta.name
        cartadiv.style.backgroundImage = "url('" + tilesBaseURL + carta.id + ".png')"
        tabla.appendChild(cartadiv)
        currentDeck.push(carta)
        updateTotalCards();
        updateAverage();
})


    document.getElementById("card_table").addEventListener("click", (event) => {


    if (event.target.className == "card_tile") {
        event.target.remove()

        for (let i = 0; i < currentDeck.length; i++) {
            if (currentDeck[i].name == event.target.textContent) {
                currentDeck.splice(i, 1)
                break
            }
        }

        updateTotalCards();

            if (currentDeck.length == 0){
            document.getElementById('avg_count').textContent = 'Average cost 0';
        }
            else{
            updateAverage();
        }
    }
})

let leftarrow = document.getElementById('left_arrow').firstElementChild;

leftarrow.addEventListener("click", (event) =>{

    if (currentPage > 0) {
        currentPage--;
        createCanvasContent();
        updatePager();
    }
})




/**
 * NO TOCAR esta función. Está asociada al evento de llegada de datos desde la API.
 * @param {array[object]} data 
 */
function getData(data) {
    cardData = data;
    currentPage = 0;
    initializeInterface(cardData);
    for (let elem of document.getElementsByClassName("cardinfo")) {
        window.fitText(elem);
    }
}

/**
 * En el momento de carga del DOM, hacemos la llamada a la API. NO TOCAR.
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.hearthstonejson.com/v1/33402/esES/cards.collectible.json').then(result => {
        if (result.ok) {
            return result.json();
        }
    }).then(jsonData => getData(jsonData));


});