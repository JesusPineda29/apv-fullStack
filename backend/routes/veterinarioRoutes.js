import express from 'express'
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword } from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

const veterinarioRoutes = express.Router();


// AREA PUBLICA rutas area publica, no se requiere cuenta para utilizarlas:
veterinarioRoutes.post('/', registrar); // post envias datos al servidor
veterinarioRoutes.get('/confirmar/:token', confirmar);
veterinarioRoutes.post('/login', autenticar);
veterinarioRoutes.post('/olvide-password', olvidePassword);
veterinarioRoutes.get('/olvide-password/:token', comprobarToken);
veterinarioRoutes.post('/olvide-password/:token', nuevoPassword);

// AREA PRIVADA rutas qu erequieren autenticacion
veterinarioRoutes.get('/perfil',checkAuth, perfil);
veterinarioRoutes.put('/perfil/:id', checkAuth, actualizarPerfil)
veterinarioRoutes.put('/actualizar-password', checkAuth, actualizarPassword)



export default veterinarioRoutes;



