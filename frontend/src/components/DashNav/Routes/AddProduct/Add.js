import React from 'react'
import { useState, useRef } from 'react'
import './add.scss'
import Separator from '../../../Separator/Separator'
import {MdGamepad} from 'react-icons/md'
import {MdUploadFile} from 'react-icons/md'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Add() {

  const [data, setData] = useState({
    title: "",
    genre: "",
    price: 0,
    developer: "",
    publisher: "",
    date: '',
    descriptions: "",
    fileCover1: [],
    fileCover2: [],
    fileBanner: [],
    fileImg1: [],
    fileImg2: [],
    fileImg3: [],
    fileImg4: []
  })




  const handleChange = (e) =>{
    const {name, value} = e.target
    
    setData((prev) => {
      return {...prev, [name]: value}
    })
    // console.log(data)
  }

   const [descriptions, setDescriptions] = useState('')

  const handleEditor = (e, editor) => {
      setDescriptions(editor.getData())
      setData({...data, descriptions: editor.getData()})
  }



  const handleUpload = (e) => {
      const id = e.target.id
      // console.log(id)
      // console.log(id, value.replace('C:\\fakepath\\', ' '))
      // const trim = value.replace('C:\\fakepath\\', ' ')
      // const fileName = trim.replace(/\s+/g, '')
      // const file = e.target.files[0]
      setData({...data, [id] : e.target.files[0]})
      // console.log(data)
  }

  // console.log(current.current.value.replace('C:\\fakepath\\', ' '))

  const onSubmitForm = async (e) =>{
    e.preventDefault()

    const formData = new FormData()
    // console.log(data)
    formData.append('title' , data.title)
    formData.append('genre' , data.genre)
    formData.append('price', data.price)
    formData.append('developer', data.developer)
    formData.append('publisher', data.publisher)
    formData.append('date', data.date)
    formData.append('descriptions', data.descriptions)
    formData.append('fileCover1', data.fileCover1)
    formData.append('fileCover2', data.fileCover2)
    formData.append('fileBanner', data.fileBanner)
    formData.append('fileImg1', data.fileImg1)
    formData.append('fileImg2', data.fileImg2)
    formData.append('fileImg3', data.fileImg3)
    formData.append('fileImg4', data.fileImg4)

    for (const entry of formData.entries()) {
      console.log(entry);
      
    }

    // for (const value of formData.values()) {
    //   console.log(value);
      
    // }

    // console.log(formData)
    

    try {
      // const body = {
      //   title: data.title,
      //   genre: data.genre,
      //   price: data.price,
      //   developer: data.developer,
      //   publisher: data.publisher,
      //   date: data.date,
      //   descriptions: data.descriptions,

      // }
      // console.log(formData)

      // const url = window.location.href;
      // const check = url +'/addProduct'
      // console.log(check)
      const token = window.localStorage.getItem('accessToken')
      const response = await fetch("/admin/addProduct", {
        method: "POST",
        // headers: {"Authorization" : "Bearer " + token},
        body: formData
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        window.location = '/'
      })
      
    } catch (error) {
      console.log(error.message)
    }
    
  }


  
  return (
    <div className='add-container'>
      <form className='form-container' onSubmit={onSubmitForm}>
        <div className='form-container-level'>
          <div className='field-container'>
            <label>Product Title</label>
            <input type='text' name='title' value={data.title} onChange = {handleChange}></input>
          </div>
          <div className='field-container'>
            <label>Product Genre</label>
            <select id='genre' name='genre' value={data.genre} onChange = {handleChange}>
              <option className='default' disabled></option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="single">Single-Player</option>
              <option value="survival">Survival</option>
              <option value="fps">FPS</option>
              <option value="rpg">RPG</option>
              <option value="fighting">Fighting</option>
              <option value="sports">Sports</option>
              <option value="arcade">Arcade</option>
            </select>
          </div>
          <div className='field-container'>
            <label>Price</label>
            <input type='number' name='price' value={data.price} onChange= {handleChange}></input>
          </div>
        </div>

        <div className='form-container-level'>
          <div className='field-container'>
            <label>Developer</label>
            <input type='text' name='developer' value={data.developer} onChange= {handleChange}></input>
          </div>
          <div className='field-container'>
            <label>Publisher</label>
            <input type='text' name='publisher' value={data.publisher} onChange= {handleChange}></input>
          </div>
          <div className='field-container'>
            <label>Release Date</label>
            <input type = 'date' name='date' value={data.date} onChange= {handleChange}></input>
          </div>
        </div>

        <div className='form-container-level'>
          <div className='field-container three'>
            <label>Product Descriptions</label>
            
            <CKEditor editor = {ClassicEditor}
            data={data.descriptions} onChange={handleEditor}></CKEditor>
            {/* {data.descriptions} */}
          </div>
        </div>

        <div className='form-container-level'>
          <div className='field-container four'>
            <label>Product Images</label>

            <div className='image-container'>
              <div className='image-cover'  onClick={() => document.querySelector("#fileCover1").click()}>
                <MdUploadFile className='icon'></MdUploadFile>
                <input type='file' id='fileCover1' name='fileCover1' accept='image/*' className='upload' hidden 
                onChange={handleUpload}></input>
                {/* onChange={e => {setData({...data, cover1 : e.target.files[0].name})}}></input> */}
                {data.fileCover1.name ? <label>{data.fileCover1.name}</label>: <label>Upload Image</label>}
              </div>
              <div className='image-showcase'>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileCover2").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileCover2' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileCover2.name ? <label>{data.fileCover2.name}</label>: <label>Upload Image</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileBanner").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileBanner' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileBanner.name ? <label>{data.fileBanner.name}</label>: <label>Upload Image</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg1").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg1' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg1.name ? <label>{data.fileImg1.name}</label>: <label>Upload Image</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg2").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg2' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg2.name ? <label>{data.fileImg2.name}</label>: <label>Upload Image</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg3").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg3' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg3.name ? <label>{data.fileImg3.name}</label>: <label>Upload Image</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg4").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg4' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg4.name ? <label>{data.fileImg4.name}</label>: <label>Upload Image</label>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bottom-container'>
            <label>*Product details will be submitted into the database. Please check carefully before submitting.</label>
            <button type='submit' className='submit-button'>Submit</button>
        </div>
        
      </form>
    </div>
  )
}

export default Add