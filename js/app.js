// Constructor para productos

function Productos(producto, ancho, alto, tipo) {
     this.producto = producto;
     this.ancho = ancho;
     this.alto = alto;
     this.tipo = tipo;
}
Productos.prototype.cotizarProducto = function() {
     /*
          1 = ventana 
          2 = cortina 
          3 = puerta 
     */
     let cantidad;
     const base = 1500;

     switch(this.producto){
          case 'Ventana':
               cantidad = base;
               break;
          case 'Cortina':
               cantidad = base;
               break;
          case 'Puerta':
               cantidad = base;
               break;
     }
     cantidad = this.ancho * 200 + this.alto * 100 + cantidad;
     if
     (this.tipo === 'Blackout') {
          cantidad = cantidad + cantidad * 0.50;
     } else if (this.tipo === 'SunScreen') {
          cantidad = cantidad + cantidad * 0.25;
     }

     return cantidad;
}


// Todo lo que se muestra
function Interfaz() {}


const selectorTipo = document.querySelector('#selectorTipo');
const producto = document.querySelector('#producto');

const MostrarTipos = () => {
     const indice = producto.selectedIndex;
     if(indice === 2) {
          // Crear un div
          const selector = document.createElement('div');
          selector.classList.add('mt-10')
          // Insertar la informacion
          selector.innerHTML = `
          <fieldset id="tipo">
          <legend  class="font-bold  uppercase text-2xl text-center w-full">Tipo</legend>

          <div class="flex justify-around mt-5">
              <div>
                  <label class="font-bold  uppercase mr-2">Blackout</label>
                      <input type="radio" name="tipo" value="Blackout" checked>
                  </label>
              </div>
              <div>
                  <label class="font-bold  uppercase mr-2">SunScreen</label>
                      <input type="radio" name="tipo" value="SunScreen">
                  </label>
              </div>
          </div>
  </fieldset>
          `;
          selectorTipo.appendChild(selector);
     } else {
          selectorTipo.innerHTML = '';
     }
}

producto.addEventListener("change", MostrarTipos);



// Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
     const div = document.createElement('div');

     if(tipo === 'error') {
          div.classList.add('mensaje','error');
     } else {
          div.classList.add('mensaje','correcto');
     }
     div.classList.add('mt-10');
     div.innerHTML = `${mensaje}`;
     formulario.insertBefore(div, document.querySelector('#resultado')); // Nuevo Nodo y referencia... // Si la referencia no existe se añadira al final

     setTimeout( () =>  {
          document.querySelector('.mensaje').remove();
     }, 2000);
} 

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function(productos, total) {
     const resultado = document.querySelector('#resultado');
     let producto;
     switch(productos.producto) {
          case 'Ventana':
               producto = 'Ventana';
               break;
          case 'Cortina':
               producto = 'Cortina';
               break;
          case 'Puerta':
               producto = 'Puerta';
               break;
     }
     // Crear un div
     const div = document.createElement('div');
     div.classList.add('mt-10')
     // Insertar la informacion si es cortina
     if(producto === 'Cortina') {
          div.innerHTML = `
          <p class='header'>Cotización: </p>
          <p class="font-bold">Producto: <span class="font-normal"> ${producto} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${productos.tipo} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
     `;
     } else {
          div.innerHTML = `
          <p class='header'>Cotización: </p>
          <p class="font-bold">Producto: <span class="font-normal"> ${producto} </span> </p>
          <p class="font-bold">Total: <span class="font-normal"> $ ${total} </span> </p>
     `;
     }
     
     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';
     setTimeout( () =>  {
          spinner.style.display = 'none';
          resultado.appendChild(div);
     }, 2000);
     
}

// Crear instancia de Interfaz
const interfaz = new Interfaz();


// DOM Operaciones
const formulario = document.querySelector('#cotizar-producto');

formulario.addEventListener('submit', e =>  {
     e.preventDefault();

     // leer el nombre del producto seleccionada del select
     const producto = document.querySelector('#producto').value;

     // si es cortina lee el valor del radio button
     if(producto === 'Cortina') {
          const tipo = document.querySelector('#tipo input[name="tipo"]:checked').value;
          const ancho = document.querySelector('#ancho').value;
          const alto = document.querySelector('#alto').value;
          if(producto === '' || ancho === '' || alto === '' || tipo === '') {
               // Interfaz imprimiendo un error
               interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
          } else {
               // Limpiar resultados anteriores
               const resultados = document.querySelector('#resultado div');
               if(resultados != null) {
                    resultados.remove();
               }
               const productos = new Productos(producto, ancho, alto, tipo);
               const cantidad = productos.cotizarProducto();
               interfaz.mostrarResultado(productos, cantidad);
               interfaz.mostrarMensaje('Cotizando...', 'exito');
          }    
     } else {
          //leer el ancho y el alto del input text
          const ancho = document.querySelector('#ancho').value;
          const alto = document.querySelector('#alto').value;
          // Revisamos que los campos no esten vacios
          if(producto === '' || ancho === '' || alto === '') {
               // Interfaz imprimiendo un error
               interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
          } else {
               // Limpiar resultados anteriores
               const resultados = document.querySelector('#resultado div');
               if(resultados != null) {
                    resultados.remove();
               }

               // Instanciar cotizacion y mostrar interfaz
               const productos = new Productos(producto, ancho, alto);
               // Cotizar el seguro
               const cantidad = productos.cotizarProducto();
               // Mostrar el resultado
               interfaz.mostrarResultado(productos, cantidad);
               interfaz.mostrarMensaje('Cotizando...', 'exito');
          }
     }


     

});








