const menu = document.querySelector(".hamburguesa");
const navegacion = document.querySelector(".navegacion");
const imagenes=document.querySelectorAll('img');/*cuando colocamos queryselectorall nos devuelve un arreglo, entonces para mostrarlo hay que iterarlo, osea recorrer una coleccion y devolver un valor al terminar */
const btnTodos = document.querySelector('.todos')
const btnEnsaladas= document.querySelector('.ensaladas')
const btnPasta= document.querySelector('.pastas')
const btnPizza= document.querySelector('.pizza')
const btnPostres= document.querySelector('.postres')
const contenedorPlatillos= document.querySelector('.platillos')//QUERY SELECTOR LO ESTAMOS UTILIZANDO PARA TRAER CLASES DEL HTML
document.addEventListener("DOMContentLoaded", () => {//para que funcionen las funciones flechas en javascript necesitas llamar a las funciones en este doncontendloaded
  eventos();
  platillos();
});

const eventos = () => {
  menu.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar"); //quitar la clase ocultar para que salga la barra de navegacion
  botonCerrar(); /*.REMOVE ES PARA REMOVER O ELIMINAR UNA CLASE*/
};

const botonCerrar = () => {
  const btnCerrar=document.createElement('p')
  const overlay = document.createElement('div')
  overlay.classList.add('pantalla-completa')
  const body = document.querySelector('body')
  if(document.querySelectorAll('.pantalla-completa').length>0) return /*esto es para que no me genere una cantidad infinita de ovelays, ahora solo lo puede hacer una vez */
  body.appendChild(overlay)/*para opacar la pantalla cuando desplegamos el menu */
 
  btnCerrar.textContent = 'x' /*.textcontent sirve para agregar texto a un elemento, en este caso es btncerrar */
  btnCerrar.classList.add('btn-cerrar')/*CON classList SE LLAMA A UNA CLASE, CON .add SE AGREGA UNA*/
  
  // while(navegacion.children[5]){/**esto es para que no nos genere mas parrafos con la clase btn-cerrar, muy importante que practiques esto */
  //   navegacion.removeChild(navegacion.children[5])
  // }

  navegacion.appendChild(btnCerrar)
  cerrarMenu(btnCerrar,overlay)
}
const observer = new IntersectionObserver((entries,observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const imagen = entry.target
      imagen.src = imagen.dataset.src;//aqui iteramos el arreglo de imagenes para poder mostrarlas
      observer.unobserve(imagen)
    }
  })
})//NO ENTENDI NADA DE ESTO, APRENDERLO MAS ADELANTE CUANDO LO NECESITES XD

imagenes.forEach(imagen=>{//ACÁ MOSTRAMOS NUESTRAS IMAGENES DE BIENVENIDO CON JAVASCRIPT
  
  observer.observe(imagen)
})

const cerrarMenu = (boton,overlay)=>{
  boton.addEventListener('click',()=>{
    navegacion.classList.add('ocultar')
    overlay.remove()/*remover el overlay que es el sombreado que se hace en la pagina cuando se despliega la navegacion */
    boton.remove()/**esto es para que no nos genere mas parrafos con la clase btn-cerrar, muy importante que practiques esto */
  })
  overlay.onclick=function(){/*esto se hizo para que cuando le des click en cualquier lado de la pantalla y este abierta la barra de navegacion, esta se quite y tambien el overlay, que es el sombreado */
    overlay.remove()
    navegacion.classList.add('ocultar')
    boton.remove()/**esto es para que no nos genere mas parrafos con la clase btn-cerrar, muy importante que practiques esto, le das en el overlay y se quita */
  }

}
//FILTRO PARA CADA TIPO DE PLATILLO, POR EJEMPLO ENSALADA SOLO TE MOSTRARÁ LAS ENSALADAS
const platillos = ()=>{
  let platillosArreglo=[];//AQUI ESTAN CONTENIDOS TODOS LOS ELEMENTOS, OSEA TODOS LOS PLATILLOS
  const platillos=document.querySelectorAll('.platillo')
  
  platillos.forEach(platillo=>platillosArreglo=[...platillosArreglo, platillo])//arreglo de platillos, importantisimo


  const ensaladas= platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') === 'ensalada')//AQUI SE CREA UN NUEVO ARREGLO, SE BUSCAN LOS ELEMENTOS QUE TENGAN DATA PLATILLO Y SE TOMAN SOLO LOS QUE DIGAN ENSALADA
  const pastas= platillosArreglo.filter(pasta=> pasta.getAttribute('data-platillo') === 'pasta')
  const pizzas= platillosArreglo.filter(pizza=> pizza.getAttribute('data-platillo') ==='pizza')
  const postres= platillosArreglo.filter(postre=> postre.getAttribute('data-platillo') === 'postre')
  mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo)
}



const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos)=>{
  btnEnsaladas.addEventListener('click', ()=>{//AQUI TE FILTRA CADA TIPO DE PLATOS Y TE LIMPIA EL HTML PARA QUE NO SALGAN LOS DEMAS PLATOS
    limpiarHtml(contenedorPlatillos)
    ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada))
  })

  btnPasta.addEventListener('click', ()=>{
    limpiarHtml(contenedorPlatillos)
    pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta))
  })

  btnPizza.addEventListener('click', ()=>{
    limpiarHtml(contenedorPlatillos)
    pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza))

  })

  btnPostres.addEventListener('click',()=>{
    limpiarHtml(contenedorPlatillos)
    postres.forEach(postre=> contenedorPlatillos.appendChild(postre))
  })

  btnTodos.addEventListener('click', ()=>{
    limpiarHtml(contenedorPlatillos)
    todos.forEach(todo=> contenedorPlatillos.appendChild(todo))
  })


}

const limpiarHtml=(contenedor)=>{// esto es para que cada clase de comida aparezca sola, ejemplo, si le damos clik a ensaladas que solo aparezcan los platos de ensaladas
  while(contenedor.firstChild){
    contenedor.removeChild(contenedor.firstChild)//Mientras haya contenido eliminamos el anterior
  }
}

  
/* const overlay=document.createElement('div')
  overlay.classList.add('pantalla-completa')
  const body = document.querySelector('body')
  body.appendChild(overlay) */

