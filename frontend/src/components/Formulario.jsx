import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            const fechaFormateada = paciente.fecha?.split('T')[0]
            setFecha(fechaFormateada)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault()

        // Validar el formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: 'Guardado Correctamente'
        });
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }



    const { msg } = alerta
    return (
        <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus Pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            {msg && <Alerta alerta={alerta} />}

            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="nombre">Nombre Mascota</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-white"
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la mascota"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-white"
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email Propietario</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-white"
                        type="email"
                        id="email"
                        placeholder="Email del Propietario"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="fecha">Fecha Alta</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-white"
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-white"
                        id="sintomas"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value={id?'Guardar cambios' : 'Agregar Paciente'}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"

                />

            </form>


        </>
    )
};

export default Formulario