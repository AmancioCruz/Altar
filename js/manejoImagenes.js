import { storage } from "./firebaseconfig.js";
import {
  ref,
  listAll,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const carpeta = ref(storage, "Imagenes/");

const contenedor = document.querySelector("#contenedor_imagen");
const imagen = document.querySelector("#fotografia");

let imagenes = [];  
let indiceActual = 0;

async function cargarImagenes() {
  try {
    const lista = await listAll(carpeta);

    imagenes = await Promise.all(
      lista.items.map(async (item) => await getDownloadURL(item))
    );

    if (imagenes.length === 0) {
      console.warn("⚠️ No hay imágenes en la carpeta 'Imagenes'");
      imagen.src = "recursos/imagen.png"; 
      return;
    }

    console.log(`✅ Se encontraron ${imagenes.length} imágenes.`);
    indiceActual = 0;
    mostrarImagenActual();

    setInterval(cambiarImagen, 20000);
  } catch (error) {
    console.error("❌ Error al cargar las imágenes:", error);
    imagen.src = "recursos/imagen.png";
  }
}

function mostrarImagenActual() {
  if (imagenes.length > 0) {
    imagen.src = `${imagenes[indiceActual]}?t=${Date.now()}`;
  }
}

function cambiarImagen() {
  if (imagenes.length === 0) return;

  indiceActual = (indiceActual + 1) % imagenes.length;
  mostrarImagenActual();

  console.log("🔄 Imagen cambiada:", indiceActual + 1);
}

cargarImagenes();
