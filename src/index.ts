import express ,{type Application} from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";
// import swaggerOutput from "./swagger_output.json";

import { corsOptions } from './config/config';
import loggerMiddleware from './middlewares/loggerMiddleware';


dotenv.config()


const PORT = process.env.DEVELOPMENT_PORT || 3000;


const app:Application = express();


app.use(cors(corsOptions));

app.use(loggerMiddleware);

app.use(express.json());

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('Welcome to the edutech API');
});

app.get('/health', (req, res) => {
    res.send('Health Check');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
