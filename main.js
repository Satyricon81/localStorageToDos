const alert = document.querySelector(".alert")
const formulario = document.querySelector("#formulario")
const mostrarToDo = document.querySelector("#mostrarToDo")
const templateToDos = document.querySelector("#templateToDos").content

let toDos = []

const añadirToDo = toDo => {
    const objetoToDo = {
        nombre: toDo,
        id: `${Date.now()}`
    }

    toDos.push(objetoToDo)
}

const mostrarToDos = () => {

    localStorage.setItem("toDos", JSON.stringify(toDos))

    mostrarToDo.textContent = ""

    const fragment = document.createDocumentFragment()

    toDos.forEach(item => {
        const clone = templateToDos.cloneNode(true)
        clone.querySelector(".lead").textContent = item.nombre

        //Vamos a realizar la delegacion de eventos. Queremos que al hacer click en el boton de Eliminar nos elimine el toDo asociado a ese boton. No podemos hacerlo con un addEventListener ya que el boton se crea de forma dinamica por lo que no esta disponible hasta que hagamos el toDo. Lo hacemos mediante el dataset. Lo igualamos a la funcion constructora añadirToDo.
        clone.querySelector(".btn").dataset.id = item.id
        //
        fragment.appendChild(clone)
    })

    mostrarToDo.appendChild(fragment)
}

//Delegacion de eventos. Sigue de la linea 29...
document.addEventListener ("click", (e) => {
    console.log(e.target.dataset.id);
    console.log(e.target.matches(".btn-danger"));

    if(e.target.matches(".btn-danger")) {
        toDos = toDos.filter(item => item.id !==e.target.dataset.id)
        mostrarToDos()
    }
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    alert.classList.add("d-none")
    //Con el FormData capturamos a traves del name del input todos los datos de todos los inputs.
    const data = new FormData(formulario)
    const [toDo] = [...data.values()]

    if(!toDo.trim()) {
        console.log("Error. El campo esta vacio");
        alert.classList.remove("d-none")
        return
    }
    //Si pasa la validacion del if de arriba, pasa a la linea 21 que hace que empuje el objetoToDo de la linea 31. Luego pasa a la funcion de mostrarToDos.
    añadirToDo(toDo)
    mostrarToDos()
})

document.addEventListener("DOMContentLoaded", (e) => {
    
    if(localStorage.getItem("toDos")) {
        toDos = JSON.parse(localStorage.getItem("toDos"))
        mostrarToDos()
    }
})

