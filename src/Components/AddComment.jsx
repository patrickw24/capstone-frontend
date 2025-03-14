import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export const AddComment = () => {

    const [formData, setFormData] = useState({content:''})
    const [notification, setNotification] = useState("")

    const onChangeHandler = (event)=>{
        const property= event.target.name
        const value = event.target.value
        const tmpObject= formData
        tmpObject[property]= value
        setFormData(tmpObject)
    }

    const postCommentsID= async ()=>{

        const {posts_id} = useParams()
        const url= import.meta.env.VITE_BASE_URL 
        const newURL= `${url}/comments/${posts_id}`
        const token = window.localStorage.getItem("social-credential")

        if(!formData.content){
            setNotification("Please Enter a Comment")
            return;
        }

        const response = await fetch(newURL,{
            method:'POST',
            headers:{
                'Authorization': token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(response.ok){
            setNotification("Comment Posted...Please Wait!")

            setTimeout(() => {
                window.location.href = `/comments/${postId}`
            }, 1000);
        }
    }


  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "50px" }}>
    <h2>Add a Comment</h2>
    <form onSubmit={postCommentsID}>
        <div className="form-group">
            <textarea
                name="content"
                value={formData.content}
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Write your comment here..."
                rows="5"
            />
        </div>
        <button type="submit" className="btn btn-info mt-3">Post Comment</button>
    </form>
     <p className="mt-3 text-danger">{notification}</p>
</div>
  )
}
