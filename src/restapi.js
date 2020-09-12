require('./connections/connection.mongo')();
const client = require('./connections/connection.redis')();
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const tokenMiddleware = require('./middlewares/middleware.token').tokenMiddleware;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());






const swaggerOptions = {
    definition: {
        info: {
            title: 'RESTful API',
            description: 'An API to Create or consume resources',
            version: '1.0',
            contact: {
                name: 'Alex Joshua Mbaya',
                email: 'joshuaalex52@gmail.com',
                ur: 'sirjosh.com'
            }
        }
    },
    apis: ['./src/restapi.js', './src/routes/*.js']
}
const swaggerDef = swaggerJSDOC(swaggerOptions);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDef));

/**
 * @swagger
 * /:
 *  get:
 *      description: "This is the root endpoint of our api"
 *      tags:
 *          - Root Endpoint
 *      responses:
 *          '200':
 *              description: 'Request is successful'
 *          '500':
 *              description: 'Request Failed'
 */
app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: { apiVersion: 1.0, writtenBy: 'Joshua Alex Mbaya', supervisedBy: 'Khalil Mohammed Shams <shamskhalil@gmail.com>', date: 'August 2020' }, message: 'Welcome to Joshua Alex REST API' });
});

//Auth Route
const authRoute = require('./routes/route.auth')();
app.use('/api/v1/auth', authRoute);

app.use(tokenMiddleware());

//User Rooute
const userRoute = require('./routes/route.user')();
app.use('/api/v1/user', userRoute);

//Admin Route
const adminRoute = require('./routes/route.admin')();
app.use('/api/v1/admin', adminRoute);

app.listen(3000, () => {
    console.log('SirJosh Microservice listening on port 3000')
});

module.exports.app = app;