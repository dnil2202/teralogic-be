const { dbConf, dbQuery }=require('../config/db');
const { createToken, refreshToken } =require('../config/encript')

module.exports={

    getDataUser : async (req,res)=>{
        try {
            let dataUser = await dbQuery(`Select * from user`)
            res.status(200).send(dataUser)
        } catch (error) {
            res.status(500).send(error)
        }
    },

    loginUser : async (req,res)=>{
        try {
            let {email, password } =req.body;
            
            let loginUser = await dbQuery(`Select u.id, u.username, u.email, u.role from user u WHERE ${dbConf.escape(email).includes('@') && dbConf.escape(email).includes('.co') ?`u.email = ${dbConf.escape(email)}`: `u.username = ${dbConf.escape(email)}`} 
            and u.password=${dbConf.escape(password)}`);

            if(loginUser.length > 0){
                let token = createToken({...loginUser[0]},'1h')
                    res.status(200).send({
                        ...loginUser[0],
                        token,
                    })
                    console.log(token)
            }else{
                res.status(500).send({
                    status:false,
                    message:`The username you entered doesn't belong to an account. Please check your username and try again.`
                });
            };
        } catch (error) {
            console.log(error);
        };
    },

    keepLogin : async(req,res)=>{
        try {
            let resultsUser = await dbQuery(`Select u.id, u.username, u.email, u.role from user u WHERE u.id=${dbConf.escape(req.dataToken.id)}`)
            let token = createToken({...resultsUser[0]},'10m')
            let refresh = refreshToken({...resultsUser[0]},'24h')
            res.status(200).send({
                ...resultsUser[0],
                token,
                refresh
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status:false,
                message:'Token expired'
            })
        }
    },

    refresh : async(req,res)=>{
        try {
            let resultsUser = await dbQuery(`Select u.id, u.username, u.email, u.role from user u WHERE u.id=${dbConf.escape(req.dataToken.id)}`)
            let token = createToken({...resultsUser[0]},'10m')
            let refresh = refreshToken({...resultsUser[0]},'24h')
            res.status(200).send({
                ...resultsUser[0],
                token,
                refresh
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
    
}