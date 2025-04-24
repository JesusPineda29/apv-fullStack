import express from "express"; // importamos express
import dotenv from "dotenv"; // importamos dotenv para usar las variebles de entorno (esconden onformacion delicada en el github)
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes  from "./routes/pacienteRoutes.js";

const app = express(); // mandamos llamar la función de express
app.use(express.json()); // pare decirle que enviamos datos de tipo JSON
dotenv.config(); // para usar dotenv

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !==-1) {
            // El origen del request est apermitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));

// app.use('/', (req, res) => { // use es la forma que express maneja el routing/rutas/diferentes paginas
//     // req-request es lo que estoy enviendo.     res-respond es la respuesta del servidor
//     res.send('Hola Mundo') // la respuesta del servidor (hay que salir y volver a entrar SIEMPRE) asi que intalamos NODEMON
// });


app.use("/api/veterinarios", veterinarioRoutes);

app.use("/api/pacientes", pacienteRoutes);


const PORT = process.env.PORT || 4000;

// CREAR EL SERVIDOR
app.listen(PORT, ()=> { // puerto 4000 para el frontend  y un callback para el caso que se ejecute correctamete nuestro servidor
    console.log(`Servidor funcionando en el puerto ${PORT}`);
}); 



