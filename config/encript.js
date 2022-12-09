const jwt = require('jsonwebtoken')

module.exports={

    createToken :(payload,expiresIn)=>{
        return jwt.sign(payload, 'teralogic',{
            expiresIn
        })
    },

    refreshToken :(payload,expiresIn)=>{
        return jwt.sign(payload,'refresh-teralogic',{
            expiresIn
        })
    },

    readToken :(req,res,next)=>{
        console.log('data token', req.token);
        jwt.verify(req.token,'teralogic',(err,decode)=>{
            if(err){
                return res.status(401).send({
                    message:'Authenticate error'
                })
            }
            console.log('Translate token', decode);
            req.dataToken = decode
            next()
        })
    },

    readTokenR :(req,res,next)=>{
        console.log('data token refresh', req.token);
        jwt.verify(req.token,'refresh-teralogic',(err,decode)=>{
            if(err){
                return res.status(401).send({
                    message:'Authenticate error'
                })
            }
            console.log('Translate token refresh', decode);
            req.dataToken = decode
            next()
        })
    }
}