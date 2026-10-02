/* 1. DATOS DE PRODUCTOS */
const listaProductos = [
    { nombre: "Café", precio: 2.50, imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200" },
    { nombre: "Té", precio: 2.00, imagen: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200" },
    { nombre: "Sandwich", precio: 5.00, imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200" },
    { nombre: "Jugo", precio: 3.00, imagen: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200" },
    { nombre: "Galletas", precio: 1.50, imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200" },
    { nombre: "Agua", precio: 1.00, imagen: "https://images.unsplash.com/photo-1548966673-ba55fe912c78?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
    { nombre: "Pastel", precio: 4.50, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200" },
];

let carrito = [];

/* 2. ELEMENTOS DEL DOM */
const modal = document.getElementById('modal-container');
const btnConfirmarModal = document.getElementById('btn-modal-confirmar');
const btnCancelarModal = document.getElementById('btn-modal-cancelar');
const modalTitulo = document.getElementById('modal-titulo');
const modalMensaje = document.getElementById('modal-mensaje');

/* 3. CARGA DE PRODUCTOS (Estilo Elegante) */
function cargarProductos() {
    const contenedor = document.getElementById('grilla-productos');
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        const boton = document.createElement('button');
        boton.classList.add('producto-item');
        
        boton.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            <div class="info-producto">
                <span class="nombre-producto">${producto.nombre}</span>
                <span class="precio-producto">$${producto.precio.toFixed(2)}</span>
            </div>
        `;

        boton.onclick = () => agregarAlCarrito(producto);
        contenedor.appendChild(boton);
    });
}

/* 4. LÓGICA DEL CARRITO (Actualizada: Resta uno a uno) */
function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.nombre === producto.nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarInterfazCarrito();
}

function eliminarItem(index) {
    const producto = carrito[index];
    if (producto.cantidad > 1) {
        producto.cantidad--; // Resta una unidad
    } else {
        carrito.splice(index, 1); // Si es el último, lo borra del carrito
    }
    actualizarInterfazCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarInterfazCarrito();
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

function actualizarInterfazCarrito() {
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total-precio');
    const btnCompletar = document.querySelector('.btn-completar');
    
    if (!contenedorCarrito || !totalElemento) return;

    contenedorCarrito.innerHTML = "";
    let total = calcularTotal();

    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('item-carrito');
        div.innerHTML = `
            <div class="item-info">
                <p class="item-nombre">${item.nombre}</p>
                <p class="item-detalles">${item.cantidad} × $${item.precio.toFixed(2)}</p>
            </div>
            <div class="item-precio-eliminar">
                <span class="item-subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button onclick="eliminarItem(${index})" class="btn-borrar-uno" title="Quitar uno" style=" background:none; border:none; cursor:pointer; font-size:1.2rem; color:red">🗑</button>
            </div>
        `;
        contenedorCarrito.appendChild(div);
    });

    totalElemento.innerText = `$${total.toFixed(2)}`;
    btnCompletar.disabled = carrito.length === 0;
}

/* 5. SISTEMA DE IMPRESIÓN (Optimizado para Bixolon) */
function imprimirTicket() {
    const ticketItemsHTML = carrito.map(item => `
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 4px;">
            <span>${item.cantidad}x ${item.nombre}</span>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
    `).join('');

    const ventanaPrensa = window.open('', '', 'height=600,width=400');
    ventanaPrensa.document.write(`
        <html>
            <head>
                <title>Ticket de Venta</title>
                <style>
                    @page { margin: 0; }
                    body { 
                        margin: 0; 
                        padding: 10px; 
                        width: 72mm; /* Ajuste para Bixolon */
                        font-family: 'Courier New', Courier, monospace;
                    }
                    .compact-ticket { width: 100%; height: auto; overflow: hidden; }
                    h3 { text-align: center; margin: 0 0 10px 0; }
                    hr { border: none; border-top: 1px dashed #000; margin: 10px 0; }
                    .total { display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; margin-top: 10px; }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                <div class="compact-ticket">
                    <h3>MI CAFETÍN</h3>
                    <p style="text-align: center; font-size: 12px;">Fecha: ${new Date().toLocaleString()}</p>
                    <hr>
                    ${ticketItemsHTML}
                    <hr>
                    <div class="total">
                        <span>TOTAL:</span>
                        <span>$${calcularTotal().toFixed(2)}</span>
                    </div>
                    <p style="text-align: center; margin-top: 20px; font-size: 12px;">¡Gracias por su compra!</p>
                </div>
            </body>
        </html>
    `);
    ventanaPrensa.document.close();
}

async function guardarVentaEnBD(venta) {
    console.log("Enviando a Base de Datos...", venta);
    return new Promise(resolve => setTimeout(resolve, 800)); // Simula latencia
}

/* 6. FLUJO DE VENTA */
document.querySelector('.btn-completar').onclick = () => {
    modalTitulo.innerText = "Confirmar Venta";
    modalMensaje.innerText = `Total a cobrar: $${calcularTotal().toFixed(2)}`;
    btnCancelarModal.style.display = "block";
    btnCancelarModal.innerText = "Cancelar";
    btnConfirmarModal.innerText = "Confirmar Cobro";
    
    modal.style.display = "flex";

    btnConfirmarModal.onclick = async () => {
        const ventaActual = {
            id: Date.now(),
            total: calcularTotal(),
            productos: [...carrito]
        };

        btnConfirmarModal.disabled = true;
        modalTitulo.innerText = "Procesando...";

        await guardarVentaEnBD(ventaActual);

        // Pantalla final de decisión
        modalTitulo.innerText = "¡Venta Registrada!";
        modalMensaje.innerText = "¿Deseas imprimir el ticket?";
        btnConfirmarModal.disabled = false;
        btnConfirmarModal.innerText = "Imprimir Ticket";
        btnCancelarModal.innerText = "Finalizar sin ticket";

        // Acción: Imprimir
        btnConfirmarModal.onclick = () => {
            imprimirTicket();
            cerrarVentaYLimpiar();
        };

        // Acción: No imprimir
        btnCancelarModal.onclick = () => {
            cerrarVentaYLimpiar();
        };
    };
};

function cerrarVentaYLimpiar() {
    modal.style.display = "none";
    vaciarCarrito();
    // Restauramos el comportamiento del botón cancelar para futuras ventas
    btnCancelarModal.onclick = () => modal.style.display = "none";
}

/* 7. INICIALIZACIÓN */
window.onload = () => {
    cargarProductos();
    const btnLimpiar = document.getElementById('btn-limpiar');
    if (btnLimpiar) btnLimpiar.onclick = vaciarCarrito;
    btnCancelarModal.onclick = () => modal.style.display = "none";
};