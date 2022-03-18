import { db } from '../firebase/firebase-config'


export const loadNotes = async(uid)=>{

    const notesSnap = await db.collection(`${uid}/journal/notes`).orderBy('date','desc').get();
    const notes = []     //para indicar que si el noteSnap no tiene nada entonces retorne un arreglo vacio
    
    // console.log(notesSnap)   para ver el contenido de la respuesta del notesSnap que en este punto debe contener todas las notes del usuario
    notesSnap.forEach( snapHijo =>{
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    } )

    
    // console.log(notes)


    return notes
}


























/*  funcion de ayuda para hacer peticion a la db de las notas guardadas en el firesbase.

necesita el uid del usuario para cargar estas notas es por eso que esta funcion se llama en el primer momento donde se obtiene el uid 
que es en el componente notesAction   que dispara una accion  starLoadingNotes al <AppRouter/>

db es el database proveido por firebase y que en este punto contiene las notas  del usuario ya guardadas
collection()  funcion propia de firebase a la que hay que especificarle el path de lo que quiero que me retorne
seguido del get.() para obtener una respuesta. esto me retorna una promesa
el resultado lo almaceno en la constante noteSnap


notesSnap.forEach( snapHijo =>{
        
} )
forEach para que recorra el contenido del noteSnap y este me retorne el snapHijo que en este punto ya tiene el id de cada note y la database() proveido 
por firebase. entonces a la constante notes le inserto un arreglo con el id y con el data() del snapHijo que me retorna la peticion


esto retorna una promesa es por eso que donde sea llamado debe usarse el async y el await para que espere la respuestaa

*/