import { storage } from "./firebaseconfig.js";
import {
  ref,
  listAll,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const carpeta = ref(storage, "Imagenes/");
const imagen = document.querySelector("#fotografia");

let imagenes = [];
let indiceActual = 0;
let ultimaCantidad = 0;

const TIEMPO_CAMBIO = 15000;   // 15 segundos entre imágenes
const TIEMPO_REVISION = 60000; // 1 minuto para revisar nuevas imágenes

// --------------------------------------------------------------------------
// CARGAR IMÁGENES
// --------------------------------------------------------------------------
async function cargarImagenes() {
  try {
    const lista = await listAll(carpeta);
    imagenes = await Promise.all(lista.items.map(async (item) => await getDownloadURL(item)));

    if (imagenes.length === 0) {
      console.warn("⚠️ No hay imágenes en la carpeta 'Imagenes'");
      imagen.src = "recursos/imagen.png";
      return;
    }

    // ✅ Comenzar desde la última imagen (la más reciente)
    indiceActual = imagenes.length - 1;
    ultimaCantidad = imagenes.length;

    console.log(`✅ Se encontraron ${imagenes.length} imágenes. Iniciando desde la última.`);
    mostrarImagenActual();

    // Inicia el carrusel
    setInterval(cambiarImagen, TIEMPO_CAMBIO);

    // Revisión periódica por si subieron nuevas imágenes
    setInterval(verificarNuevasImagenes, TIEMPO_REVISION);

  } catch (error) {
    console.error("❌ Error al cargar las imágenes:", error);
    imagen.src = "recursos/imagen.png";
  }
}

// --------------------------------------------------------------------------
// MOSTRAR IMAGEN ACTUAL
// --------------------------------------------------------------------------
function mostrarImagenActual() {
  if (imagenes.length > 0) {
    imagen.src = `${imagenes[indiceActual]}?t=${Date.now()}`;
  }
}

// --------------------------------------------------------------------------
// CAMBIAR IMAGEN
// --------------------------------------------------------------------------
function cambiarImagen() {
  if (imagenes.length === 0) return;

  indiceActual--;

  // Si llega antes de la primera, recarga la página
  if (indiceActual < 0) {
    console.log("🔁 Carrusel terminado. Recargando página...");
    location.reload();
    return;
  }

  mostrarImagenActual();
  console.log(`📸 Mostrando imagen ${imagenes.length - indiceActual} de ${imagenes.length}`);
}

// --------------------------------------------------------------------------
// VERIFICAR NUEVAS IMÁGENES EN FIREBASE
// --------------------------------------------------------------------------
async function verificarNuevasImagenes() {
  try {
    const lista = await listAll(carpeta);
    if (lista.items.length !== ultimaCantidad) {
      console.log("🆕 Se detectaron nuevas imágenes. Recargando...");
      location.reload(); // Recarga si hay diferencia en la cantidad
    } else {
      console.log("✅ Sin cambios detectados en Firebase.");
    }
  } catch (error) {
    console.error("⚠️ Error al verificar nuevas imágenes:", error);
  }
}

// --------------------------------------------------------------------------
// INICIO
// --------------------------------------------------------------------------
cargarImagenes();
