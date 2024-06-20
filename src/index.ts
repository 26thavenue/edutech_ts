import express ,{type Application} from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";


import { corsOptions } from './config/config';
import loggerMiddleware from './middlewares/loggerMiddleware';
import router from './routes/index'


dotenv.config()


const PORT = process.env.DEVELOPMENT_PORT || 3000;


const app:Application = express();

app.use(express.json());

app.use(morgan('dev'));

// app.use(cors(corsOptions));

app.use(loggerMiddleware);


app.use('/api', router)


app.get('/', (req, res) => {
    res.send('Welcome to the edutech API');
});

app.get('/health', (req, res) => {
    res.send('Health Check');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



