import Veterinario from "../models/Veterinario.js";
import generarId from "../helpers/generarid.js";
import generarJWT from "../helpers/generarJWT.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import bcrypt from 'bcryptjs';

const registrar = async (req, res) => {

    console.log(req.body);
    const {email, password, nombre } = req.body;


    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({email:email})
    if(existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }

    try {
        // Guardar un Nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save(); // no sabemos cuanto tardara en guardar el registro, con este await esperamos a que finalize

        // ENviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.json(veterinarioGuardado) // res.send imprime/envia algo en el navegador/pantalla
    } catch (error) {
        console.log(error);
    }
};


const perfil = (req, res) => {

    const {veterinario} = req

    res.json({veterinario})
};


const confirmar = async (req, res) => {
    // console.log(req.params.token); //para leer la ruta de confirmaar:token rautengDINAMICO
    const {token} = req.params
    const usuarioConfirmar = await Veterinario.findOne({token});
    
    if(!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token=null;
        usuarioConfirmar.confirmado=true;
        await usuarioConfirmar.save()


        res.json({msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    }
};

const autenticar = async(req, res) => {
    const {email, password} = req.body

    // Comprobar si el usuraio existe
    const usuario = await Veterinario.findOne({email})

    if(!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmado 
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no a sido confirmada')
        return res.status(403).json({msg: error.message})
    }

    // Revisar el password
    if(await usuario.comprobarPassword(password)) {

        // Autenticar
        res.json({token: generarJWT(usuario.id)})
    } else {
        const error = new Error('El password es incorrectro')
        return res.status(404).json({msg: error.message});
    }


};


const olvidePassword = async(req, res)=> {
    const {email} = req.body;

    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario) {
        const error = new Error('El usuario NO existe');
        return res.status(401).json({msg: error.message});
    }

    try {
        existeVeterinario.token = generarId()
        await existeVeterinario.save();

        // ENVIAR EMAIL CON INSTRUCCIONES
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        })

        res.json({msg: 'Hemos enviado un emal con las instrucciones'});
    } catch (error) {
        console.log(error)
    }
};



const comprobarToken = async(req, res)=> {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido) {
        // El token es valido, el usuario existe
        res.json({msg: 'Token valido y el usuario existe'})
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
};



const nuevoPassword = async(req, res)=> {
    

    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if(!veterinario) {
         const error = new Error('Hubo un error');
         return res.status(400).json({msg: error.message});
     }

    try {
        veterinario.token = null
        veterinario.password = password
        
        // Hashear la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        veterinario.password = await bcrypt.hash(veterinario.password, salt);

        await veterinario.save();
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error)
    }
};



export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
};



