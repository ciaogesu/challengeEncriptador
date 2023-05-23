const vectorClave=["a","e","i","o","u"];
const vectorEncriptacion=["ai","enter","imes","ober","ufat"];
const formEntrada = document.querySelector("[data-formulario-entrada]");
const formSalida = document.querySelector("[data-formulario-salida]");

function copy(){
    console.log("ciao");    
    let textoCopiar = formSalida.textoSalida;
    navigator.clipboard.writeText(textoCopiar.value).then(
        () => {
        alert("Texto copiado.");
    })
        .catch(err => {
        alert('No se pudo copiar el texto', err);
    })
 }

 function validacion(texto){    
    if(/[^\s]/.test(texto)){
        if(/[A-ZÑ]/.test(texto)){
            alert(" El texto incluye mayúsculas.");
        }else{
            if(/[^a-zñ\!\s]/.test(texto)){
            alert("El texto incluye caracteres especiales.");
            }else{
            return true;
            }
        }
    }else{
        alert("El texto está vacío.");
    }
    return false;
}

function modificarTexto(texto,vectorComparar,vectorCambio){        
    let aRemplazar =  RegExp(vectorComparar.join("|"),"g");
    function convert(match){
        let encri=match;
        for (let i = 0; i < vectorComparar.length; i++) {
            if(match==vectorComparar[i]){
                encri=vectorCambio[i];
                break;
            }
        }        
        return encri;
    }       
  return String(texto).replaceAll(aRemplazar, convert);
}

function encriptadoDesencriptado(llaves,encriptado){
    formSalida.textoSalida.value="";
    let texto=formEntrada.textoEntrada.value;
    if(validacion(texto)){        
        formSalida.textoSalida.value= modificarTexto(texto,llaves,encriptado);
        formSalida.textoSalida.style.background = "none";
        formEntrada.reset();
        formSalida.botonCopiar.style.display ="inline-block";
    }
}

formEntrada.botonEncriptar.addEventListener("click", (evento)=>{
    evento.preventDefault();
    encriptadoDesencriptado(vectorClave,vectorEncriptacion);
});
formEntrada.botonDesencriptar.addEventListener("click", (evento)=>{
    evento.preventDefault();
    encriptadoDesencriptado(vectorEncriptacion,vectorClave);
});
formSalida.botonCopiar.addEventListener("click",copy);