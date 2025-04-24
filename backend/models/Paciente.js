import mongoose from "mongoose"

const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        required: true
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Veterinario'
    },
},
{
    timestamps: true,
}
);

const paciente = mongoose.model('paciente', pacientesSchema);


export default paciente;