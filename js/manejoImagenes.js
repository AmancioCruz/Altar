import { storage } from "./firebaseconfig.js";
import {
  ref,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const referencia = ref(storage, "Imagenes/fotografia.png");

async function mostrarImagen() {
  try {
    const imagen = document.querySelector("#fotografia");
     const url= await getDownloadURL(referencia);
     imagen.src = url;

  } catch (error) {
    console.error(error);
  }
}

setInterval(mostrarImagen, 3000);

mostrarImagen();
