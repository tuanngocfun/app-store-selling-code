import React from 'react'
import { useState } from 'react'
import './signup.scss'
import Separator from '../Separator/Separator'
// import logoVertical from '../../images/logo/verical-green.png'
import poster from '../../images/mando.jpg'
import { Link, Navigate } from 'react-router-dom'
function SignUp(prop) {
    const [title, setTitle] = useState(prop.title)
    const [isError, setIsError] = useState(undefined)
    const [isValid, setIsValid] = useState(undefined)

    const [input, setInvalidInput] = useState("")
    const [form, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        age: 0,
        password: "",  
    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData({...form, [name] : value})  
        // handleValidate()
    }

    // const handleValidate = () => {

    //     if( form.password.length < 8 || form.password.length > 30 ||
    //         form.firstname == null || form.lastname == null ||
    //         form.age < 18 || form.age > 100)
    //         {
    //             setInvalidInput("isError")
    //             setIsValid(false)
    //         }
    //     else{
    //         setInvalidInput("")
    //         setIsValid(true)
    //     }
    // }


    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {
                firstname: form.firstname,
                middlename: form.middlename,
                lastname: form.lastname,
                email: form.email,
                age: form.age,
                password: form.password
            }
        
            const url = window.location.href;

            // if(isValid === true){
                const response = await fetch(url, {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.error)
                    console.log(input)
                    console.log(isValid)
                    if(data.error === false){
                        setIsError(false)
                        // console.log(isError)
                        window.location = '/admin/signin'
                    }
                    else{
                        setIsError(true)
                    }
                })            
            // }
            
            
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
        
        // console.log(form)
    

    // console.log(data.email)
  return (
    <div className='sign-up-container'>
        <Separator status='1'></Separator>
        <div className='pseudo-form-container'>
            <div className='sign-up-form-container'>
                <span>Create New {title} Account</span>
                <form className='form-input-container' onSubmit={onSubmitForm}>
                    <div className='section'>
                        <input className='opacity' type="email" name='email'
                            onChange={handleChange}
                            placeholder='Your Email (An activation link will be sent)' required
                            autoComplete='on'></input>
                            {isError === true ? <label className='label isError' id='email'>This email is already registered!</label>
                            : <label className='label'></label>
                            }
                    </div>
                    
                    <div className='section'>
                        <input className='opacity' type="password" name='password' value={form.password}
                            onChange={handleChange}
                            placeholder='Your Password'></input>
                        <label className={`input ${input}`} id='password'>Your password needs to be between 8 and 30 characters long
                        </label>  
                            
                    </div>
                    
                    <div className='section'>
                    <input className='opacity' type="text" name='firstname' value={form.firstname}
                        onChange={handleChange}
                        placeholder='First Name'></input>
                        <label className={`input ${input}`} id='firstname'>You can not leave this field blank</label>
                    </div>
                    <div className='section'>
                    <input className='opacity' type="text" name='middlename' value={form.middlename}
                        onChange={handleChange}
                        placeholder='Middle Name (Optional)'></input>
                    </div>
                    <div className='section'>
                    <input className='opacity' type="text" name='lastname' value={form.lastname}
                        onChange={handleChange}
                        placeholder='Last Name'></input>
                        <label className={`input ${input}`} id='lastname'>You can not leave this field blank</label>
                    </div>
                    <div className='section'>
                    <input className='opacity' type= "number" name='age' value={form.age}
                        onChange={handleChange}
                        placeholder='Your Age'></input>
                     <label className={`input ${input}`} id='age'>Your age is invalid</label>
                    </div>
                    <button type='submit'>Submit</button>
                </form>

                <Link to={{pathname: `/${prop.title}/signin`}} className='back'>Back to Sign In</Link>
            </div>

            <div className='poster'>
                <img src={poster} alt=''></img>
            </div>
        </div>
        
        <Separator></Separator>

        {/* <div className='success-container'>
            <h1>Welcome to Risen Family!</h1>
            <h1>You have successfully created account!</h1>
        </div> */}
    </div>
  )
}

export default SignUp