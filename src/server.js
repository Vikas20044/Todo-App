import express from 'express';
import path,{dirname} from 'path'; // to locate file , that used in sending html file
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT , ()=>{
      console.log(`Server has started at ${PORT}`)
});
