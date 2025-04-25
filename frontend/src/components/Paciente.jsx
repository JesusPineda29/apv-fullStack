import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {

    const {setEdicion, eliminarPaciente} = usePacientes()

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente



    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }



  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-600">Nombre: <span className="font-normal normal-case text-black my-2">{nombre}</span></p>

        <p className="font-bold uppercase text-indigo-600">Propietario: <span className="font-normal normal-case text-black my-2">{propietario}</span></p>
        
        <p className="font-bold uppercase text-indigo-600">Email de contacro: <span className="font-normal normal-case text-black my-2">{email}</span></p>

        <p className="font-bold uppercase text-indigo-600">fecha de alta: <span className="font-normal normal-case text-black my-2">{formatearFecha(fecha)}</span></p>

        <p className="font-bold uppercase text-indigo-600">sintomas: <span className="font-normal normal-case text-black my-2">{sintomas}</span></p>

        <div className="flex justify-between mt-10 my-5">
            <button onClick={() => setEdicion(paciente)} type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg">Editar</button>
            <button onClick={() => eliminarPaciente(_id)} type="button" className="py-2 px-10 bg-red-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg">Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente



