import Swal from 'sweetalert2'
import { db } from '../firebase/firebase-config'
import { types } from '../types/types'
import { loadNotes } from '../helpers/loadNotes';
import { fileUpLoad } from '../helpers/fileUpLoad';

 
//sidebar
export const startNewNote = ()=>{
    return async(dispatch, getState) =>{

        const {uid} = getState().auth     //de este punto viene el id del usuario
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()    //me da el momento exacto en que se crea la nota
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

        
        dispatch(activeNote(doc.id, newNote))
        //Activa la nota cuando creao una nueva nota es decir cuando doy click en el calendario newEntry

        //agrega la nueva nota al sidebar
        dispatch(addNewNote(doc.id, newNote))

    }
}

//se dispara en la action startNewNote y en el NoteScreen
export const activeNote = (id, note) =>({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
})

//se dispara en la action startNewNote
export const addNewNote = (id, note)=>({
    type: types.notesAddNew,
    payload:{
        id, 
        ...note
    }

})


//AppRouter
export const starLoadingNotes = (uid)=>{
    return async( dispatch )=>{
        const notes = await loadNotes(uid)    //helper que carga las notas relacionadas con el uid
        dispatch(setNotes(notes))
    }
}

// se dispara en starLoadingNotes
export const setNotes = (notes) =>({
    type: types.notesLoad,
    payload: notes
})


//carga las notas que se escriben en el NotesAppbar y actualizac con los cambios las notas del lateral sidebar 
export const startSaveNote = (note)=>{
    return async (dispatch, getState)=>{

        const {uid} = getState().auth     //de este punto viene el id del usuario

        if( !note.imageUrl ){              //si la nota no tiene imageUrl entonces la elimine
            delete note.imageUrl
        }
        const noteToFirestore = {...note}   //elimino el id ya que firestore ya lo tiene cuando se creo
        delete noteToFirestore.id

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)         //path de la nota que quiero actualizar

        dispatch(refreshNote(note.id, note  ))
        Swal.fire('saved',note.title,'success')

    }  
}//en este punto ya se guardo la nota en firebase

//recibe cambios en el notesAppbar y actualiza el panel lateral de notas del Sidebar
export const refreshNote = (id, note)=>({

    type: types.notesUpdated,
    payload: {
        id,
        note:{
            id,
            ...note
        }
    }
})


//NotesAppbar
export const startUpLoadin = ( file ) => {

    return async (dispatch, getState) =>{

        const { active:activeNote } = getState().notes

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        //uso de helper fileUpLoad para la subida del archivo a cloudinary
        const fileUrl = await fileUpLoad(file)
        activeNote.imageUrl = fileUrl    //a la nota activa,imageUrl le agrego la propiedad fileUrl
        
        dispatch( startSaveNote( activeNote ) ) //disparo nuevamente la action startSaveNote
        
        Swal.close()            //cierra la alerta del loading ejecutado en onBeforeOpen cuando ya se recibe la respuesta

    }
}
//NotesScreen
export const startDeleting = ( id )=>{
    return async( dispatch, getState )=>{

        const uid = getState().auth.uid

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

//NotesScreen
export const deleteNote = (id)=>({

    type: types.notesDeleteUrl,
    payload: id

})


//sidebar
export const noteLogout = ()=>({

    type: types.notesLogoutCleaning,    


})

























/* (PENDIENTE: CAMBIAR REGLAS DE PERMISOS DEL FIREBASE A request.auth != null (llamado sidebar)
startNewNote ==> Action que crea una nueva nota cuando esta active con sus propiedades tal cual como lo tengo definido en el notesReducer que va a ser almacenada 
en firestore con el path que tengo en el firebase-config {db} y que mando a la base de datos

Para grabar informacion en firestore necesito el uid del usuario eso lo obtengo como segundo argumento del return "getState" le puedo dar cualquier nombre y funciona 
como el useSelector.
getState me proporciona el state de mi aplicacion tal cual como este en el momento que es llamado.
En este punto cuando es llamado en el Sidebar me proporciona el usuario ya logged y puedo extrar sus propiedades como el uid.

newNote  ==> es un objeto que hace referencia a una nueva nota creada con las propiedades que yo quiero que tenga como lo defini en el notesReducer cuando la nota esta
active.

doc  ==> para hacer referencia al documento

db.collection  ==>funcion propia de firebase para mandar una coleccion de argumentos que es la ruta o el path de como quiero que se gaurde mi newNota.
es decir en mi base de datos los datos se guardan de forma secuencial segun el path, se crea una coleccion que contiene un documento que a su vez contiene una coleccion
que tiene documentos y asi cuantas veces quiero. 
En este caso quiero que la primera coleccion sea el uid del usuaario como documento el journal y como coleccion las notas y alli se van a almacenar cada una de las 
notas que el usuario va a crear.

el .add es algo que retorna una promesa que resuelve el Document Reference. entonces por eso la dejo como un async
de esta forma le indico espera que se haga la insersion y el doc va a tener la referencia al documento

una vez tenga el doc para activar la nota llamo la funcion activeNote


activeNote  ===> funcion que llama el type notesActive, es llamada dentro del startNewNote asi que recibe el id de esta funcion y lo retorna con 
lo que recibe como argumento del note que es el title, body y date.







===========**============
setNotes  ==> Action que llama el type notesLoad, que recibe las notas y retorna las mismas notas que recibe y el notesLoad esta en el noteReducer

loadNotes ===> es un helpers que carga las notas que esten relacionadas con el id del usuario por eso lo llamo en este punto ya que esta es la primera vez que se
tiene acceso a ese uid. este helper retorna una promesa es por eso que se hace necesario el await para esperar la misma y almaceno esa respuesta en una constante llamada {notes}

startSaveNote ===> recibe la nota y es una action que retorna una promesa es por eso que uso el dispatch de thunk y el getState para obtener el id del usuario
Es necesario elimimar el id ya que en firestore no voy a cargar la nota con el id, este ya lo tiene. 
con el operador spred separo todos los elementos de la nota y lo elimino con el delete

refreshNote   ==> actualiza el panel lateral cuando se modifica la nota recibe el id de la nota que hay que actualizar y la nota

startUpLoadin  ==> Action que es llamada en el NotesAppbar y recibe el file que es el documento que se va a acargar en el cloudinary

startDeleting  ==> Elimina una nota del firestore y dispara la acction deleNote que elimina la nota del stores,
recibe el id de la nota que quiero eliminar, await espera la respuesta de db.doc(`${uid}/journal/notes/${id}`).delete(); propia de firebase
para eliminar, que tiene el path de lo que se quiere eliminar.


deleteNote  ==> modifica el store para eliminar la nota de mi reducer, recibe el id de la nota que se va a eliminar

noteLogout ==> elimina las notas una vez el usuario haga loggout, se llama en el authActions cuando el usuario hace el logout
*/