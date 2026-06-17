import express from 'express';
import path,{dirname} from 'path'; // to locate file , that used in sending html file
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
const app = express();
const PORT = process.env.PORT || 5003;

// get file path from url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  // used to locate file 

//middleware 
//tell express to tell all public folder as static
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json());

// sending html file from public
app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'public','index.html'));
});

// Routes 
//for authentication
app.use('/auth',authRoutes);
// For todo
app.use('/todos',authMiddleware,todoRoutes);

app.listen(PORT , ()=>{
      console.log(`Server has started at ${PORT}`)
});
