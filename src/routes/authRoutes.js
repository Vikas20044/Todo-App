import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
router.post('/register',(req,res)=>{
      //getting username and password
      const { username,password } = req.body;
      console.log( username , password );
      const hashedPassword = bcrypt.hashSync(password, 8);
      console.log(hashedPassword);
      

      // Inserting into database
      try{
            const insertUser = db.prepare(`INSERT INTO users(username,password) VALUES (?,?)`);
            const result = insertUser.run(username,hashedPassword);

            const defaultTodo = `Add your first todo`;

            const insertTodo = db.prepare(`INSERT INTO todo(userId, task) VALUES(?,?)`);

            insertTodo.run(result.lastInsertRowid, defaultTodo);

            //create token
            const token =jwt.sign({id:result.lastInsertRowid},
                  process.env.JWT_SECRET,
                  {expiresIn:'24h'});

            res.json({token});
            
 

      }
      catch(error){
            console.log(error.meaage);
            
      }

});

router.post('/login',(req,res)=>{
      const {username,password} = req.body;
      try{
            // getting user 
            const getUser = db.prepare('SELECT * FROM users where username = ? ');
            const user = getUser.get(username);

            if(!user){// if username not found 
                  return res.status(400).send({message: "user not found"});
            }
            // checking ser name valid
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if(!passwordIsValid){
                  return res.status(404).send({message : "password is incorrect"});
            }

            // Successfull authentication
            const token = jwt.sign({ id : user.id},
                  process.env.JWT_SECRET,
                  { expiresIn : '24h'}
            );
            console.log(user);
            res.json({token});

      }catch(err){
            console.log(err.message);
            res.sendStatus(503);
      }
});

export default router;