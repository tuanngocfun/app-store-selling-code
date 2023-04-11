import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './editItem.scss'
function EditItem(props) {
    // const [edit, setEdit] = useState(false)
    const [isDeleted , setIsDeleted] = useState(false)
    const handleDelete = async () => {
        const token = window.localStorage.getItem('accessToken')
        const body = {
            productID : props.id
        }
        const deleteProduct = await fetch('/api', {
            method: "DELETE",
            headers: {"Authorization" : "Bearer " + token, "Content-type": "application/json"},
            body: JSON.stringify(body)
        })
        .then((res) => res.json)
        .then(() => {
            setIsDeleted(true)
        })
    } 

    const handleEdit = () => {
        window.localStorage.setItem("editID", props.id)
    }

  return (
    <div className={ isDeleted ? 'edit-item-container deleted' : 'edit-item-container'}>
        <div className='left-container'>
            <div className='image-container'>
                <img src={props.thumb} alt={props.title}></img>
            </div>
            <div className='info-container'>
                <label className='title'>{props.title}</label>
                <label className='id'>Product ID: {props.id}</label>
                <label className='price'>Price: {`$${props.price}`}</label>
            </div>
        </div>
        
        <div className='right-container'>
            <Link to = {{pathname: `/admin/${props.id}`}} className='edit-button' onClick={handleEdit}>Edit</Link>
            <button className='delete-button' onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default EditItem