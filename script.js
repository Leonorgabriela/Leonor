// ==========================================
// DATOS DE EJEMPLO
// ==========================================

const productos = [

    {
        id: 1,
        nombre: "Cuaderno",
        categoria: "Papelería",
        stock: 20,
        tasaVenta: 4,
        tiempoEntrega: 3,
        puntoReorden: 17
    },

    {
        id: 2,
        nombre: "Esfero",
        categoria: "Papelería",
        stock: 12,
        tasaVenta: 4,
        tiempoEntrega: 3,
        puntoReorden: 17
    },

    {
        id: 3,
        nombre: "Lápiz",
        categoria: "Papelería",
        stock: 30,
        tasaVenta: 2,
        tiempoEntrega: 4,
        puntoReorden: 13
    },

    {
        id: 4,
        nombre: "Colbón",
        categoria: "Escolar",
        stock: 15,
        tasaVenta: 2.5,
        tiempoEntrega: 3,
        puntoReorden: 12.5
    },

    {
        id: 5,
        nombre: "Borrador",
        categoria: "Papelería",
        stock: 18,
        tasaVenta: 1.5,
        tiempoEntrega: 3,
        puntoReorden: 9.5
    },

    {
        id: 6,
        nombre: "Regla",
        categoria: "Escolar",
        stock: 7,
        tasaVenta: 1.2,
        tiempoEntrega: 4,
        puntoReorden: 9.8
    }

];


// ==========================================
// CAMBIAR DE PESTAÑA
// ==========================================

function mostrarSeccion(nombreSeccion) {

    // Ocultar todas las secciones

    const secciones =
        document.querySelectorAll(".seccion");

    secciones.forEach(function(seccion) {

        seccion.classList.remove("activa");

    });


    // Mostrar la sección seleccionada

    const seleccionada =
        document.getElementById(nombreSeccion);

    seleccionada.classList.add("activa");


    // Cambiar título

    const titulos = {

        inicio: "Inicio",

        inventario: "Inventario",

        productos: "Productos",

        ventas: "Ventas",

        proveedores: "Proveedores",

        alertas: "Alertas"

    };


    document.getElementById("titulo").textContent =
        titulos[nombreSeccion];


    // Quitar clase active de los botones

    const botones =
        document.querySelectorAll(".menu");

    botones.forEach(function(boton) {

        boton.classList.remove("active");

    });


    // Activar botón correspondiente

    botones.forEach(function(boton) {

        if (
            boton.getAttribute("onclick")
                .includes(nombreSeccion)
        ) {

            boton.classList.add("active");

        }

    });

}



// ==========================================
// CALCULAR DÍAS PARA AGOTARSE
// ==========================================

function calcularDias(producto) {

    if (producto.tasaVenta <= 0) {

        return 0;

    }


    /*
        Solución de la ED:

        I(t) = I0 - vt

        Cuando I(t) = 0:

        0 = I0 - vt

        t = I0 / v
    */

    const dias =
        producto.stock /
        producto.tasaVenta;


    return dias.toFixed(2);

}



// ==========================================
// SABER SI DEBE REORDENARSE
// ==========================================

function necesitaReorden(producto) {

    return producto.stock <=
           producto.puntoReorden;

}



// ==========================================
// MOSTRAR TABLA DE INVENTARIO
// ==========================================

function mostrarInventario(lista = productos) {

    const tabla =
        document.getElementById("tabla-inventario");


    tabla.innerHTML = "";


    lista.forEach(function(producto) {

        const dias =
            calcularDias(producto);


        const reordenar =
            necesitaReorden(producto);


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>
                <strong>
                    ${producto.nombre}
                </strong>
            </td>

            <td>
                ${producto.categoria}
            </td>

            <td>
                ${producto.stock}
            </td>

            <td>
                ${producto.tasaVenta}/día
            </td>

            <td>
                <strong>
                    ${dias} días
                </strong>
            </td>

            <td>
                ${producto.puntoReorden}
            </td>

            <td>

                <span class="estado
                    ${
                        reordenar
                        ? "reordenar"
                        : "suficiente"
                    }">

                    ${
                        reordenar
                        ? "REORDENAR"
                        : "STOCK SUFICIENTE"
                    }

                </span>

            </td>

        `;


        tabla.appendChild(fila);

    });

}



// ==========================================
// FILTRAR PRODUCTOS
// ==========================================

function filtrarProductos() {

    const texto =
        document
        .getElementById("buscar")
        .value
        .toLowerCase();


    const estado =
        document
        .getElementById("filtroEstado")
        .value;


    const filtrados =
        productos.filter(function(producto) {


            // Buscar por nombre

            const coincideNombre =
                producto.nombre
                .toLowerCase()
                .includes(texto);


            // Estado

            const reordenar =
                necesitaReorden(producto);


            let coincideEstado = true;


            if (estado === "reordenar") {

                coincideEstado = reordenar;

            }


            if (estado === "suficiente") {

                coincideEstado = !reordenar;

            }


            return coincideNombre &&
                   coincideEstado;

        });


    mostrarInventario(filtrados);

}



// ==========================================
// MOSTRAR ALERTAS
// ==========================================

function mostrarAlertas() {

    const contenedor =
        document.getElementById("lista-alertas");


    contenedor.innerHTML = "";


    const alertas =
        productos.filter(function(producto) {

            return necesitaReorden(producto);

        });


    alertas.forEach(function(producto) {

        const dias =
            calcularDias(producto);


        const alerta =
            document.createElement("div");


        alerta.className = "alerta";


        alerta.innerHTML = `

            <p class="subtitulo">
                REABASTECIMIENTO
            </p>

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                El producto alcanzó su punto
                de reorden.
            </p>


            <div class="datos-alerta">

                <div class="dato-alerta">

                    <span>
                        Stock actual
                    </span>

                    <strong>
                        ${producto.stock}
                        unidades
                    </strong>

                </div>


                <div class="dato-alerta">

                    <span>
                        Venta diaria
                    </span>

                    <strong>
                        ${producto.tasaVenta}/día
                    </strong>

                </div>


                <div class="dato-alerta">

                    <span>
                        Días para agotarse
                    </span>

                    <strong>
                        ${dias} días
                    </strong>

                </div>


                <div class="dato-alerta">

                    <span>
                        Punto de reorden
                    </span>

                    <strong>
                        ${producto.puntoReorden}
                    </strong>

                </div>

            </div>

        `;


        contenedor.appendChild(alerta);

    });

}



// ==========================================
// ALERTAS EN INICIO
// ==========================================

function mostrarAlertasInicio() {

    const contenedor =
        document.getElementById(
            "productos-alerta"
        );


    const alertas =
        productos.filter(function(producto) {

            return necesitaReorden(producto);

        });


    alertas.forEach(function(producto) {

        const dias =
            calcularDias(producto);


        const fila =
            document.createElement("div");


        fila.style.padding = "13px 0";

        fila.style.borderBottom =
            "1px solid #edf0f4";


        fila.innerHTML = `

            <strong>
                ${producto.nombre}
            </strong>

            -

            ${producto.stock}
            unidades

            <span style="
                float:right;
                color:#c75536;
            ">

                ${dias} días · REORDENAR

            </span>

        `;


        contenedor.appendChild(fila);

    });

}



// ==========================================
// REGISTRAR VENTA
// ==========================================

function registrarVenta() {

    const mensaje =
        document.getElementById(
            "mensajeVenta"
        );


    mensaje.textContent =
        "Venta registrada correctamente. " +
        "Más adelante esta acción actualizará " +
        "el inventario en Supabase.";


    mensaje.style.color =
        "#218052";

}



// ==========================================
// FECHA
// ==========================================

function mostrarFecha() {

    const fecha =
        new Date();


    document.getElementById("fecha")
        .textContent =

        fecha.toLocaleDateString(
            "es-CO",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}



// ==========================================
// INICIALIZAR
// ==========================================

mostrarInventario();

mostrarAlertas();

mostrarAlertasInicio();

mostrarFecha();