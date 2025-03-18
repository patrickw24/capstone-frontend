import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const AddComment = () => {

    const [formData, setFormData] = useState({content:''})
    const [notification, setNotification] = useState("")
    const [comments, setComments] = useState([]);
    const {posts_id} = useParams()
    const {comments_id} = useParams()
    const globalUser = window.localStorage.getItem("social-email")


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

    
      console.log(formData)

    const postCommentsID= async (event)=>{
        event.preventDefault()
        
        const url= import.meta.env.VITE_BASE_URL 
        const newURL= `${url}/comments`
        const token = window.localStorage.getItem("social-credential")
        const userEmail= window.localStorage.getItem("social-email")
        console.log(newURL)
        if(!formData.content){
            setNotification("Please Enter a Comment")
            return;
        }

        const tmp={
            content: formData.content ,
            email: userEmail,
            posts_id: posts_id
        }

        const response = await fetch(newURL,{
            method:'POST',
            headers:{
                'Authorization': token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(tmp)
        })

        if(response.ok){
            setNotification("Comment Posted...Please Wait!")

            setTimeout(() => {
                window.location.href = `/comments/${posts_id}`
            }, 1000);
        }
    }


    const deleteCommentID= async(comments_id)=>{
        const url= import.meta.env.VITE_BASE_URL 
        /*can't get ID*/
        const newURL= `${url}/comments/${comments_id}`
        const token = window.localStorage.getItem("social-credential")
        

        const response = await fetch(newURL,{
            method:'DELETE',
            headers:{
                Authorization: token,
            },
        })

        if(response.ok){
            getCommentsID()
        }else{
            console.log("Failed to Delete Comment")
        }
        
    }
    console.log(comments.id)
    console.log(comments)


  return (
    <div className="container addTweetCSS" >
    
    <div className="card text-white bg-primary mb-4 p-3">
      <div className="card-body">
      <h4 className="card-title text-center">Add a Comment</h4>
        <form onSubmit={postCommentsID}>
          <div className="form-group">
            <textarea
              name="content"
              onChange={onChangeHandler}
              className="form-control"
              placeholder="Write your comment here..."
              value={formData.content}
            />
          </div>
          <button type="submit" className="btn btn-info mt-3">
            Post Comment
          </button>
        </form>
        <p className="mt-3 text-info">{notification}</p>
      </div>
    </div>

   

     <div className="container centerdiv" style={{ height: "100vh" }}>
     {comments.length === 0 ? (
          <div>
            <h2 className="text-primary mt-5">No comments yet. Be the first to comment!</h2>
          </div>
        ) : (
          comments.map((item) => (
            <div key={item.comments_id} className="card border-info mb-3" style={{ maxWidth: '50rem' }}>
              <div className="card-header">{item.created_at}</div>
              <div className="card-body">
                <h4 className="card-title">{item.content}</h4>
                <p className="card-text">{item.email}</p>
                {globalUser === item.email && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteCommentID(item.comments_id)}
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
</div>
  )
}
