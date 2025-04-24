import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarid.js';

const verterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true, // para validacion en el servidor
        trim: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default:false
    }
});

verterinarioSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
       return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

verterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Veterinario = mongoose.model("Veterinario", verterinarioSchema);
export default Veterinario;




