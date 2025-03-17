import express from 'express';
import cors from 'cors';
import auth from './routes/auth.js';
import dashboard from './routes/dashboard.js';


const app = express();
const port = 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/auth', auth);
app.use('/dashboard', dashboard);


app.listen(port, () => {
	console.log(`app listening on ${port}`);
})