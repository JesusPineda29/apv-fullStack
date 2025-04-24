import express from 'express'
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioControllers.js';
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



export default veterinarioRoutes;



