import express from 'express';
import db from '../db.js';

const router = express.Router();

// getting all todo of logged user
router.get('/',(req,res)=>{
      const getTodoes = 
});

//creating new todo
router.post('/',(req,res)=>{

});

// Updating todo
router.put('/:id',(req,res)=>{

});

// deleting todo
router.delete('/:id',(req,res)=>{

});

export default router;