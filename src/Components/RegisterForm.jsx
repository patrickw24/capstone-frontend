import React from 'react'
import { useState } from 'react'

export const RegisterForm = () => {

    const [formData, setFormData] = useState({name:'', password:'',email:''})
    const [notification, setNotification] = useState("")

        const onChangeHandler = (event) =>{
            const property = event.target.name;
            const value = event.target.value;
            const tmpObject = formData;
            tmpObject[property] = value;
            setFormData(tmpObject);
        }

        const handleSubmit = async (event)=>{

            event.preventDefault()
            const url= import.meta.env.VITE_BASE_URL
            const newURL = `${url}/auth/register`
            console.log(newURL)
            
            const result = await fetch(newURL,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!formData.name || !formData.password || !formData.email) {
                setNotification("All fields are required.");
                return;
            }
            if(result.ok){
                setNotification("Account was created")

                setTimeout(() => {
                    window.location.href = "/"
                }, 5000)
    
            }else{
                const response = await result.json()
                setNotification(response.error)
            }
        }

        const loginButton = ()=>{
            window.location.href= "/"
        }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{maxWidth: "400px", height: "100vh"}}>
      <div
        className="card text-white bg-primary mb-3"
        style={{ maxWidth: "20rem" }}
      >
        
        <div className="card-body">
          <h4 className="card-title">Register Account</h4>
          
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div>
                  <label className="form-label mt-4">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    onChange={onChangeHandler}
                  />
                </div>
                <div>
                  <label
                    
                    className="form-label mt-4"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={onChangeHandler}
                    placeholder="Enter Name"
                  
                  />
                </div>
                <div>
                  <label
                    
                    className="form-label mt-4"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={onChangeHandler}
                    placeholder="Password"
                    
                  />
                </div>

                <button type="submit" className="btn btn-info mt-4  w-100">
                Register Account
                </button>
                
                <button type="button" onClick={loginButton} className="btn btn-secondary mt-4 w-100">
                  Back to Login
                </button>
              </fieldset>
            </form>
          <p className='mt-2'>{notification}</p>
        </div>
      </div>
    </div>
  )
}
