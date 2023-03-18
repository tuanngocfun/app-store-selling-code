const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const {readFileSync} = require('fs')

const pool = require('./connection')
const { verify } = require('crypto')

//Middleware
app.use(cors());
app.use(express.json())


//Hash Configuration
const salt = bcrypt.genSaltSync(12)

//JWT_SECRET_KEY
const JWT_SECRET_KEY = "9876543210"

//Routes

//Create Admin
app.post('/admin/signup', async(req ,res) =>{
    try{
        const {firstname, middlename, lastname, email, age, password} = req.body
        

        const check = await pool.query("SELECT EXISTS(SELECT 1 FROM rsn_admin WHERE email = $1)", [email])
        
        const isRegistered = check.rows[0]
        if(isRegistered.exists){
            console.log("error")
            res.json({error: true})
        }
        else{
            const hashPwd = await bcrypt.hash(password, salt)
            const newAdmin = await pool.query("INSERT INTO rsn_admin (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 1) RETURNING *", 
            [firstname, middlename, lastname, email, age, hashPwd])
            res.json({error: false})
            console.log("ok")
        }


        
        // console.log(newAdmin)
    }
    catch(err){
        console.log(err.message)
    }
})

//Get all Admins

//Check login info of an Admin by Email 
app.post('/admin/signin', async(req, res) => {
    try {
        const {email, password} = req.body;

        const admin = await pool.query(
            "SELECT * FROM rsn_admin WHERE email = $1 AND EXISTS (SELECT 1 FROM rsn_admin WHERE email = $1)",
            [email])

       
        const registeredAdmin = admin.rows[0]
        
        if(!registeredAdmin){
            res.json({isAuthenticated: false})
            console.log("Login Failed")
        }
        else
        {
            if(await bcrypt.compare(password, registeredAdmin.password))
            {
                // console.log(req.body)
                const token = jwt.sign({email: registeredAdmin.email, password: registeredAdmin.password}, 
                JWT_SECRET_KEY)
                res.json({isAuthenticated : true, accessToken: token}) 
                console.log("Login Successful")
            }
            else{
                res.json({isAuthenticated: false})
            }
            
        } 

    }
    catch (error) {
        console.log(error.message)
    }
})

//Get Admin Details

app.post("/admin", async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if(authHeader) {
            const token = authHeader.split(" ")[1]
            jwt.verify(token, JWT_SECRET_KEY, (err, adminDetails) => {
                if(err){
                    return res.status(401).json("Token is not valid")
                }
                const validAdmin = jwt.decode(token)
                // console.log(validAdmin.email)

                const getAdmin = async () => {
                    const admin = await pool.query(
                        "SELECT adid, firstname, middlename, lastname, email, age, role_name FROM rsn_admin NATURAL JOIN rsn_role WHERE email = $1 AND role_id = role_id AND EXISTS (SELECT 1 FROM rsn_admin WHERE email = $1)",
                        [validAdmin.email])
        
                    adminDetails = admin.rows[0]
                    
                    res.json(adminDetails)
                }

                getAdmin()
                
            })
        }
    } catch (error) {
        
    }
})

//Update Admin Table

//Update an Admin

//Delete an Admin

const loadProducts = () =>  JSON.parse(readFileSync('products.json'));

app.get('/', (req,res) => {
    res.send("RISEN BACKEND")
})


app.get('/api', (req,res) => {
    res.send(loadProducts());
})

app.listen(5000, () =>{
    console.log("Server started on PORT 5000")
})