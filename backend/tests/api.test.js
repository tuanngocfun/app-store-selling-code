process.env.JWT_SECRET_KEY = 'test-secret-key'

const request = require('supertest')
const { app, pool, server } = require('../server') // Import the Express app and the PostgreSQL pool from server.js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Close the connection to the database after all tests have run
afterAll(async () => {
    // Close the server after all tests
    server.close()
    // Close the database connection after all tests
    await pool.end()
})

describe('Admin Signup', () => {
    it('should successfully register a new admin', async () => {
        const newAdmin = {
            firstname: 'John',
            middlename: 'Doe',
            lastname: 'Smith',
            email: 'john@example.com',
            age: 30,
            password: 'password123',
            role_ID: 1, // Add an appropriate role_ID from rsn_role table
        }

        const res = await request(app).post('/admin/signup').send(newAdmin)
        expect(res.statusCode).toEqual(200)
        expect(res.body.error).toBeFalsy()

        // Cleanup: delete the created admin
        await pool.query('DELETE FROM rsn_admin WHERE email = $1', [
            newAdmin.email,
        ])
    }, 10000)

    it('should not register an admin with a duplicate email', async () => {
        const newAdmin = {
            firstname: 'John',
            middlename: 'Doe',
            lastname: 'Smith',
            email: 'john@example.com',
            age: 30,
            password: 'password123',
            role_ID: 1, // Add an appropriate role_ID from rsn_role table
        }

        // Create an admin to simulate a duplicate
        await request(app).post('/admin/signup').send(newAdmin)

        const res = await request(app).post('/admin/signup').send(newAdmin)
        expect(res.statusCode).toEqual(200)
        expect(res.body.error).toBeTruthy()

        // Cleanup: delete the created admin
        await pool.query('DELETE FROM rsn_admin WHERE email = $1', [
            newAdmin.email,
        ])
    })
})

describe('Admin Signin', () => {
    const adminData = {
        firstname: 'Jane',
        middlename: 'Doe',
        lastname: 'Smith',
        email: 'jane.doe@example.com',
        age: 28,
        password: 'password1234',
    }

    // Create an admin before running the tests
    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(adminData.password, salt)
        await pool.query(
            'INSERT INTO rsn_admin (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 1)',
            [
                adminData.firstname,
                adminData.middlename,
                adminData.lastname,
                adminData.email,
                adminData.age,
                hashPwd,
            ]
        )
    })

    // Test successful admin signin
    it('should authenticate an existing admin with correct email and password', async () => {
        const res = await request(app).post('/admin/signin').send({
            email: adminData.email,
            password: adminData.password,
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.isAuthenticated).toBeTruthy()
        expect(res.body).toHaveProperty('accessToken')
    })

    // Test admin signin with incorrect password
    it('should not authenticate an admin with an incorrect password', async () => {
        const res = await request(app).post('/admin/signin').send({
            email: adminData.email,
            password: 'wrongpassword',
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.isAuthenticated).toBeFalsy()
    })

    // Test admin signin with non-existing email
    it('should not authenticate an admin with a non-existing email', async () => {
        const res = await request(app).post('/admin/signin').send({
            email: 'nonexistent@example.com',
            password: adminData.password,
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.isAuthenticated).toBeFalsy()
    })

    // Cleanup: delete the created admin after the tests
    afterAll(async () => {
        await pool.query('DELETE FROM rsn_admin WHERE email = $1', [
            adminData.email,
        ])
    })
})

describe('POST /user', () => {
    let userToken

    const userData = {
        firstname: 'Test',
        lastname: 'User',
        email: 'test.user@example.com',
        age: 25,
        password: 'testpassword',
    }

    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        await pool.query(
            'INSERT INTO rsn_user (firstname, lastname, email, age, password) VALUES($1, $2, $3, $4, $5)',
            [
                userData.firstname,
                userData.lastname,
                userData.email,
                userData.age,
                hashedPassword,
            ]
        )

        const res = await request(app).post('/user/signin').send({
            email: userData.email,
            password: userData.password,
        })
        userToken = res.body.accessUserToken
        console.log('Generated token:', userToken) // Add this line to log the generated token
    })

    it('should return user details, wishlist count, wishlist items, and library data with a valid token', async () => {
        const res = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${userToken}`)

        console.log('Response body:', res.body) // Add this line to log the response body

        expect(res.statusCode).toEqual(200)

        // User details
        expect(res.body[0]).toHaveProperty('firstname')
        expect(res.body[0]).toHaveProperty('lastname')
        expect(res.body[0]).toHaveProperty('email')
        expect(res.body[0]).toHaveProperty('age')
        expect(res.body[0]).not.toHaveProperty('password')

        // Wishlist count
        expect(res.body[1]).toHaveProperty('count')

        // Wishlist items
        expect(res.body[2]).toBeInstanceOf(Array)

        // Library data
        expect(res.body[3]).toBeInstanceOf(Array)
    })

    it('should return an error with an invalid token', async () => {
        const res = await request(app)
            .post('/user')
            .set('Authorization', 'Bearer invalid-token')

        expect(res.statusCode).toEqual(401)
        expect(res.body).toBe('Token is not valid.')
    })

    afterAll(async () => {
        await pool.query('DELETE FROM rsn_user WHERE email = $1', [
            userData.email,
        ])
    })
})

// test('Test user purchasing a product', async () => {
//     // Replace with appropriate values from your sample data
//     const user_email = 'alice.doe@example.com';
//     const user_password = 'password5678'; // Replace with the original plain text password you used for this user in your sample data
//     const product_id = 11;

//     // Log in the user to get the token
//     const loginResponse = await request(app)
//         .post('/login')
//         .send({ email: user_email, password: user_password });
//     const token = loginResponse.body.token;

//     // Purchase the product
//     const purchaseResponse = await request(app)
//     .post('/pay')
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//         product_id: 16, // Replace with the appropriate product ID
//         creditNumb: '0000 0000 0000 0001',
//         creditName: 'Alice',
//         creditDate: '11/25',
//         creditCVC: '133',
//         totalPrice: 59.99, // Replace with the appropriate total price
//         quantity: 1, // Replace with the appropriate quantity
//         order: {
//             userid: 22, // Replace with the appropriate user ID
//         },
//     });

//     // Check if the purchase was successful
//     expect(purchaseResponse.status).toBe(200);
//     expect(purchaseResponse.body.message).toBe('Purchase successful');

//     // Verify that the product was added to the user's purchased items
//     const purchasedResponse = await request(app)
//         .get('/purchased')
//         .set('Authorization', `Bearer ${token}`);

//     // Check if the purchased product is in the response
//     expect(purchasedResponse.status).toBe(200);
//     expect(purchasedResponse.body).toContainEqual(
//         expect.objectContaining({ productid: product_id })
//     );
// });

// describe('User Data, Wishlist, and Library', () => {
//     const userData = {
//         firstname: 'Alice',
//         middlename: 'Doe',
//         lastname: 'Johnson',
//         email: 'alice.doe@example.com',
//         age: 27,
//         password: 'password5678',
//     }

//     let accessToken

//     // Create a user before running the tests
//     beforeAll(async () => {
//         const saltRounds = 10
//         const hashPwd = await bcrypt.hash(userData.password, saltRounds)
//         await pool.query(
//             'INSERT INTO rsn_user (firstname, middlename, lastname, email, age, password) VALUES($1, $2, $3, $4, $5, $6)',
//             [
//                 userData.firstname,
//                 userData.middlename,
//                 userData.lastname,
//                 userData.email,
//                 userData.age,
//                 hashPwd,
//             ]
//         )

//         // Obtain an access token for the created user
//         accessToken = jwt.sign(
//             { email: userData.email },
//             process.env.JWT_SECRET_KEY
//         )
//     })

//     // Test fetching user data, wishlist count, wishlist items, and library data with a valid access token
//     it('should fetch user data, wishlist count, wishlist items, and library data with a valid access token', async () => {
//         const res = await request(app)
//             .post('/user')
//             .set('Authorization', `Bearer ${accessToken}`)

//         expect(res.statusCode).toEqual(200)
//         expect(res.body).toHaveLength(4)
//         expect(res.body[0].email).toEqual(userData.email)
//         // Add assertions for wishlist count, wishlist items, and library data
//     })

//     // Cleanup: delete the created user after the tests
//     afterAll(async () => {
//         await pool.query('DELETE FROM rsn_user WHERE email = $1', [
//             userData.email,
//         ])
//     })
// })

// describe('Fetch Admin Details', () => {
//     const adminData = {
//         firstname: 'Jane',
//         middlename: 'Doe',
//         lastname: 'Smith',
//         email: 'jane.doe@example.com',
//         age: 28,
//         password: 'password1234',
//     }

//     let accessToken

//     // Create an admin before running the tests
//     beforeAll(async () => {
//         const hashPwd = await bcrypt.hash(adminData.password, salt)
//         await pool.query(
//             'INSERT INTO rsn_admin (firstname, middlename, lastname, email, age, password, role_id) VALUES($1, $2, $3, $4, $5, $6, 1)',
//             [
//                 adminData.firstname,
//                 adminData.middlename,
//                 adminData.lastname,
//                 adminData.email,
//                 adminData.age,
//                 hashPwd,
//             ]
//         )

//         // Obtain an access token for the created admin
//         accessToken = jwt.sign({ email: adminData.email }, JWT_SECRET_KEY)
//     })

//     // Test fetching admin details with a valid access token
//     it('should fetch admin details with a valid access token', async () => {
//         const res = await request(app)
//             .post('/admin')
//             .set('Authorization', `Bearer ${accessToken}`)
//         expect(res.statusCode).toEqual(200)
//         expect(res.body.email).toEqual(adminData.email)
//         expect(res.body.firstname).toEqual(adminData.firstname)
//         expect(res.body.middlename).toEqual(adminData.middlename)
//         expect(res.body.lastname).toEqual(adminData.lastname)
//         expect(res.body.age).toEqual(adminData.age)
//     })

//     // Test fetching admin details with an invalid access token
//     it('should not fetch admin details with an invalid access token', async () => {
//         const res = await request(app)
//             .post('/admin')
//             .set('Authorization', 'Bearer invalid-token')
//         expect(res.statusCode).toEqual(401)
//     })

//     // Cleanup: delete the created admin after the tests
//     afterAll(async () => {
//         await pool.query('DELETE FROM rsn_admin WHERE email = $1', [
//             adminData.email,
//         ])
//     })
// })

// describe('Fetch All Products', () => {
//     // Sample product data
//     const productData = {
//         title: 'Test Product',
//         genre: 'Action',
//         price: 19.99,
//         developer: 'Test Developer',
//         publisher: 'Test Publisher',
//         date: '2023-05-01',
//         descriptions: 'Test product description',
//         file_ID: 1,
//     }

//     // Insert a product into the database before running the tests
//     beforeAll(async () => {
//         await pool.query(
//             'INSERT INTO rsn_product (title, genre, price, developer, publisher, date, descriptions, file_ID) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
//             [
//                 productData.title,
//                 productData.genre,
//                 productData.price,
//                 productData.developer,
//                 productData.publisher,
//                 productData.date,
//                 productData.descriptions,
//                 productData.file_ID,
//             ]
//         )
//     })

//     // Test fetching all products
//     it('should fetch all products', async () => {
//         const res = await request(app).get('/api')
//         expect(res.statusCode).toEqual(200)
//         expect(res.body).toBeInstanceOf(Array)
//         expect(res.body.length).toBeGreaterThan(0)
//         expect(
//             res.body.some((product) => product.title === productData.title)
//         ).toBeTruthy()
//     })

//     // Cleanup: delete the inserted product after the tests
//     afterAll(async () => {
//         await pool.query('DELETE FROM rsn_product WHERE title = $1', [
//             productData.title,
//         ])
//     })
// })

// describe('GET /api/top/wishlist', () => {
//     afterEach(async () => {
//         // Reset any mocks or test data after each test
//         jest.restoreAllMocks()

//         // Clean up test data in the database
//         await pool.query('DELETE FROM rsn_wishlist')
//         await pool.query('DELETE FROM rsn_product')
//     })

//     const insertTestData = async (products, wishlistItems) => {
//         for (const product of products) {
//             await pool.query(
//                 'INSERT INTO rsn_product (productid, title, price, filecover1) VALUES ($1, $2, $3, $4)',
//                 [
//                     product.productid,
//                     product.title,
//                     product.price,
//                     product.filecover1,
//                 ]
//             )
//         }

//         for (const wishlistItem of wishlistItems) {
//             await pool.query(
//                 'INSERT INTO rsn_wishlist (productid, userid) VALUES ($1, $2)',
//                 [wishlistItem.productid, wishlistItem.userid]
//             )
//         }
//     }

//     // Test case 1: End-user based/System Test tests the overall functionality of the API
//     // by simulating a typical use case where a user wants to retrieve a list of top products in the wishlist.
//     it('should return a list of top products in the wishlist', async () => {
//         const products = [
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: 100,
//                 filecover1: 'cover1.jpg',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: 200,
//                 filecover1: 'cover2.jpg',
//             },
//         ]
//         const wishlistItems = [
//             { productid: 1, userid: 1 },
//             { productid: 1, userid: 2 },
//             { productid: 2, userid: 1 },
//         ]

//         await insertTestData(products, wishlistItems)

//         const res = await request(app).get('/api/top/wishlist')

//         expect(res.status).toEqual(200)
//         expect(res.body).toEqual([
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: '100',
//                 filecover1: 'cover1.jpg',
//                 count: '2',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: '200',
//                 filecover1: 'cover2.jpg',
//                 count: '1',
//             },
//         ])
//     })

//     // Test case 2: Alternate Flow Test tests the behavior of the API when there are no products in the wishlist,
//     // which is an alternate scenario compared to the main use case.
//     it('should return an empty list when there are no products in the wishlist', async () => {
//         const res = await request(app).get('/api/top/wishlist')

//         expect(res.status).toEqual(200)
//         expect(res.body).toEqual([])
//     })

//     it('should return the correct top products sorted by the wishlist count', async () => {
//         const products = [
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: 100,
//                 filecover1: 'cover1.jpg',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: 200,
//                 filecover1: 'cover2.jpg',
//             },
//             {
//                 productid: 3,
//                 title: 'Product 3',
//                 price: 300,
//                 filecover1: 'cover3.jpg',
//             },
//         ]
//         const wishlistItems = [
//             { productid: 1, userid: 1 },
//             { productid: 1, userid: 2 },
//             { productid: 1, userid: 3 },
//             { productid: 2, userid: 1 },
//             { productid: 2, userid: 2 },
//             { productid: 3, userid: 1 },
//         ]

//         await insertTestData(products, wishlistItems)

//         const res = await request(app).get('/api/top/wishlist')

//         expect(res.status).toEqual(200)
//         expect(res.body).toEqual([
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: '100',
//                 filecover1: 'cover1.jpg',
//                 count: '3',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: '200',
//                 filecover1: 'cover2.jpg',
//                 count: '2',
//             },
//             {
//                 productid: 3,
//                 title: 'Product 3',
//                 price: '300',
//                 filecover1: 'cover3.jpg',
//                 count: '1',
//             },
//         ])
//     })

//     // Test case 4: Boundary value test - Products with the same wishlist count
//     it('should return the correct order of products with the same wishlist count', async () => {
//         const products = [
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: 100,
//                 filecover1: 'cover1.jpg',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: 200,
//                 filecover1: 'cover2.jpg',
//             },
//             {
//                 productid: 3,
//                 title: 'Product 3',
//                 price: 300,
//                 filecover1: 'cover3.jpg',
//             },
//         ]

//         const wishlistItems = [
//             { productid: 1, userid: 1 },
//             { productid: 1, userid: 2 },
//             { productid: 2, userid: 1 },
//             { productid: 2, userid: 2 },
//         ]

//         await insertTestData(products, wishlistItems)

//         const res = await request(app).get('/api/top/wishlist')

//         expect(res.status).toEqual(200)
//         expect(res.body).toEqual([
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: '100',
//                 filecover1: 'cover1.jpg',
//                 count: '2',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: '200',
//                 filecover1: 'cover2.jpg',
//                 count: '2',
//             },
//         ])
//     })

//     // Test case 5: Decision-based test - Wishlist with no products
//     it('should return an empty list when there are no products in the wishlist', async () => {
//         const products = [
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: 100,
//                 filecover1: 'cover1.jpg',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: 200,
//                 filecover1: 'cover2.jpg',
//             },
//             {
//                 productid: 3,
//                 title: 'Product 3',
//                 price: 300,
//                 filecover1: 'cover3.jpg',
//             },
//         ]

//         // Empty wishlist
//         const wishlistItems = []

//         await insertTestData(products, wishlistItems)

//         const res = await request(app).get('/api/top/wishlist')

//         expect(res.status).toEqual(200)
//         expect(res.body).toEqual([])
//     })

//     // Test case 6: Decision-based test - Only one product in the wishlist
//     it('should return a list with only one product when there is only one product in the wishlist', async () => {
//         const products = [
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: 100,
//                 filecover1: 'cover1.jpg',
//             },
//             {
//                 productid: 2,
//                 title: 'Product 2',
//                 price: 200,
//                 filecover1: 'cover2.jpg',
//             },
//             {
//                 productid: 3,
//                 title: 'Product 3',
//                 price: 300,
//                 filecover1: 'cover3.jpg',
//             },
//         ]

//         const wishlistItems = [{ productid: 1, userid: 1 }]

//         await insertTestData(products, wishlistItems)

//         const res = await request(app).get('/api/top/wishlist')

//         expect(res.status).toEqual(200)
//         expect(res.body).toEqual([
//             {
//                 productid: 1,
//                 title: 'Product 1',
//                 price: '100',
//                 filecover1: 'cover1.jpg',
//                 count: '1',
//             },
//         ])
//     })
// })
