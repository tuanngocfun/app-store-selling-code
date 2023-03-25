const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const {readFileSync} = require('fs')
const multiparty = require('multiparty')

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


// const loadProducts = () =>  JSON.parse(readFileSync('products.json'));

app.get('/', (req,res) => {
    res.send("RISEN BACKEND")
})


//Get Products

app.get('/api', async (req,res) => {
    try {
        const getProduct = async () => {
            const product = await pool.query("SELECT * FROM rsn_product")
            productDetails = product.rows
            console.log(productDetails)
            res.json(productDetails)
        }

        getProduct()
    } catch (error) {
        console.log(error.message)
    }

    // res.send(loadProducts());
})

//Get a Product By ID

app.get('/api/:id', async (req,res) =>{
    try {
        // console.log(req.params.id)
        const productID = req.params.id
        const getDetails = async () => {
            const product = await pool.query("SELECT * FROM rsn_product where productid = $1", [productID])
            productDetails = product.rows[0]
            // console.log(productDetails)
            res.json(productDetails)
        }

        getDetails()
    } catch (error) {
        console.log(error.message)
    }
})

//Add a Product
const IMAGE_UPLOAD_DIR = './public/images'
const IMAGE_BASE_URL = 'http://localhost:5000/images/'

app.use(express.static('public'))

app.post('/admin/addProduct', async (req, res) => {
    try {
        // const {title, genre, price, developer, 
        //        publisher, date, descriptions} = req.body    
        
        let form = new multiparty.Form({uploadDir: IMAGE_UPLOAD_DIR})
        form.parse(req, async function(err, fields, files){
            if(err) return res.send({status :"Error"})

            // console.log(`fields = ${(JSON.stringify(fields, null, 2))}`)
            // console.log(`files = ${(JSON.stringify(files, null, 2))}`)



            const uploadedImages = {
                cover1: files.fileCover1[0].path.slice(files.fileCover1[0].path.lastIndexOf("\\") + 1),
                cover2 : files.fileCover2[0].path.slice(files.fileCover2[0].path.lastIndexOf("\\") + 1),
                banner: files.fileBanner[0].path.slice(files.fileBanner[0].path.lastIndexOf("\\") + 1),
                img1: files.fileImg1[0].path.slice(files.fileImg1[0].path.lastIndexOf("\\") + 1),
                img2: files.fileImg2[0].path.slice(files.fileImg2[0].path.lastIndexOf("\\") + 1),
                img3: files.fileImg3[0].path.slice(files.fileImg3[0].path.lastIndexOf("\\") + 1),
                img4: files.fileImg4[0].path.slice(files.fileImg4[0].path.lastIndexOf("\\") + 1)
            }

            const imagePaths = {
                fileCover1URL : IMAGE_BASE_URL + uploadedImages.cover1,
                fileCover2URL : IMAGE_BASE_URL + uploadedImages.cover2,
                fileBannerURL : IMAGE_BASE_URL + uploadedImages.banner,
                fileImg1URL : IMAGE_BASE_URL + uploadedImages.img1,
                fileImg2URL : IMAGE_BASE_URL + uploadedImages.img2,
                fileImg3URL : IMAGE_BASE_URL + uploadedImages.img3,
                fileImg4URL : IMAGE_BASE_URL + uploadedImages.img4,
            }
            
            // console.log(imagePaths)
            // const imagePath = files.fileCover1[0].path
            // const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\") + 1)
            // const imageURL = IMAGE_BASE_URL + imageFileName
            // console.log(imageURL)

            const product = {
                title: fields.title[0],
                genre: fields.genre[0],
                price: fields.price[0],
                developer: fields.developer[0],
                publisher: fields.publisher[0],
                date: fields.date[0],
                descriptions: fields.descriptions[0],
                imagePaths: imagePaths
            }

            try {
                const newProduct = await pool.query("INSERT INTO rsn_product (title, genre, price, developer, publisher, date, descriptions, filecover1, filecover2, filebanner, fileimg1, fileimg2, fileimg3, fileimg4) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
                [product.title, product.genre, product.price, product.developer, product.publisher, product.date, product.descriptions, 
                 product.imagePaths.fileCover1URL, product.imagePaths.fileCover2URL, product.imagePaths.fileBannerURL,
                 product.imagePaths.fileImg1URL, product.imagePaths.fileImg2URL, product.imagePaths.fileImg3URL, product.imagePaths.fileImg4URL])
                res.json({status: "added"})
                console.log("ok")
            } catch (error) {
                console.log("fail")
            }



            // res.send({status :"OK"})
        })
        
        
    } catch (error) {
        console.log("Fail")
    }
})

app.listen(5000, () =>{
    console.log("Server started on PORT 5000")
})