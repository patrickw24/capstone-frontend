import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const AddComment = () => {

    const [formData, setFormData] = useState({content:''})
    const [notification, setNotification] = useState("")
    const [comments, setComments] = useState([]);
    const {posts_id} = useParams()
    const onChangeHandler = (event)=>{
        const property= event.target.name
        const value = event.target.value
        const tmpObject= formData
        tmpObject[property]= value
        setFormData(tmpObject)
    }

    const commentContent= (event)=>{
        const content = event.target.value
        setFormData(content)
    }

    const getCommentsID = async ()=>{

        
        const url= import.meta.env.VITE_BASE_URL 
        const newURL= `${url}/comments/${posts_id}`
        const token = window.localStorage.getItem("social-credential")

        const response = await fetch(newURL,{
            method:'GET',
            headers:{
                'Authorization': token,
                'Content-Type' : 'application/json'
            }
        })
       if(response.ok){
        const data = await response.json()
        setComments(data)
       }

    }

    useEffect(() => {
        if (posts_id) {
          getCommentsID();
        }
      }, [posts_id]);

    


    const postCommentsID= async (event)=>{
        event.preventDefault()
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
                window.location.href = `/comments/${posts_id}`
            }, 1000);
        }
    }


    const deleteCommentID= async(id)=>{
        const url= import.meta.env.VITE_BASE_URL 
        const newURL= `${url}/comments/${id}`
        const token = window.localStorage.getItem("social-credential")

        const response = await fetch(newURL,{
            method:'DELETE',
            headers:{
                'Authorization': token,
                'Content-Type' : 'application/json'
            },
        })
        
    }



  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "50px" }}>
    <h2>Add a Comment</h2>
    <form onSubmit={postCommentsID}>
        <div className="form-group">
            <textarea
                name="content"
                value={formData.content}
                onChange={commentContent}
                className="form-control"
                placeholder="Write your comment here..."
                
            />
        </div>
        <button type="submit" className="btn btn-info mt-3">Post Comment</button>
    </form>
     <p className="mt-3 text-success">{notification}</p>


     <div className="container centerdiv" style={{ height: "100vh" }}>
     {comments.map((comment) => (
                    <div
                        key={comment.posts_id}
                        className="card border-info mb-3"
                        style={{ maxWidth: "50rem" }}
                    >
                        <div className="card-header">{comment.created_at}</div>
                        <div className="card-body">
                            <h4 className="card-title">{comment.content}</h4>
                            <p className="card-text">{comment.email}</p>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteCommentID(comment.posts_id)}
                            >
                                Delete Comment
                            </button>
            </div>
          </div>
        ))}
      </div>
</div>
  )
}
