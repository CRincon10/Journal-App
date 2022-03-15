


export const fileUpLoad = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/daitboxm5/upload';    //peticion ya probada en postman

    const formData = new FormData();
    formData.append('upload_preset','react-journal')
    formData.append('file', file)

    try {
        
        const resp = await fetch( cloudUrl, {      //por defecto retorna hace peticion get por eso hay que indicarle que es 'POST'
            method: 'POST',
            body: formData
        })

        if( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url
        } else{
            throw await resp.json()
        }


    } catch (error) {
        throw error
    }


    //returna el URL de la imagen

}










/*
helper de peticion POST a cloudinary.
la peticion carga la imagen al cloudinary y se hace la carga con metodo de js formData
react-journal   es el nombre que le di al repositorio de cloudinary

try porque puede tener errores se maneja el error


el IF()
return cloudResp.secure_url es donde cloudinary guarda la url de la imagen


*/