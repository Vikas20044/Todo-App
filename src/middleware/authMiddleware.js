import jsw from 'jsonwebtoken';

function authMiddleware(req,res,next){
      const token = req.headers['Authorization'];
      if(!token){
            return res.status(401).json({message: 'No token provided'});
      }

      jsw.verify(token.process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                  return res.status(401).json({message: 'Invalid token'});
            }

            req.userid = decoded.id;
            next();
      })
      

}

export default authMiddleware;