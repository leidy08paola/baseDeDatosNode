
require('dotenv').config();

const express = require('express');
const {sequelize, testConnection} = require('./config/database');
const {swaggerUi, specs} = require ('./config/swagger');
const estudianteRouter = require('./routes/estudianteRoutes');

const app = express();
const PORT = process.env.PORT || 500;

app.use(express.json());
app.use(express.urlencoded ({
    extended: true
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs ,{
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none; }',
    customSiteTitle: 'API CRUD Estudiantes - Documentacion'
}));
app.use('/api/estudiantes',estudianteRouter);


app.get('/', (req, res) => {
    res.json({
        mensaje: 'API CRUD Estudiantes con Sequelize',
        enpoints:{
            listar: 'GET /api/estudiantes',
            buscar: 'GET /api/estudiantes/:id',
            crear: 'POST /api/estudiantes',
            actualizar: 'PUT /api/estudiantes/:id',
            eliminar: 'DELETE /api/estudiantes/:id'
        }
    });
});

const iniciarServidor = async ()=>{

    try{
        // 1 verificar la conexion aBd

        await testConnection();


        await sequelize.sync(({
            force : false,
            alter :true
        }));

        console.log('modelos sincronizaados con db')

        // levantar el iniciarServidor

        app.listen(PORT,()=>{
            console.log(`el servidor esta corriendo en http://localhost:${PORT}`);
             console.log(`api disponible es http://localhost:${PORT}/api/estudiantes`);
             console.log(`agregar documentaacion  Swagger en http://localhost:${PORT}/api-docs`);
        });

    } catch(err){
        console.error('no se puede inicar el servidor ', err.message);
        process.exit(1);
    }
};
 iniciarServidor();

 