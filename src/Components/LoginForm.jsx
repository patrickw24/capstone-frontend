import React from "react";
import { useState } from "react";

export const LoginForm = () => {


    const [formData, setFormData] = useState({email:'', password:''})
    const [notification, setNotification] = useState("")
    const registerButton= ()=>{
        window.location.href= "/register"
    }

    const onChangeHandler = (event)=>{
        const property= event.target.name
        const value = event.target.value
        const tmpObject= formData
        tmpObject[property]= value
        setFormData(tmpObject)
    }

    const onSubmitHandler = async (event)=>{
        event.preventDefault()

        const url = import.meta.env.VITE_BASE_URL
        const newURL= `${url}/auth/login`

        if(!formData.email || !formData.password){
            setNotification("All fields are required")
            return;
        }

        const result = await fetch(newURL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData) 
        })

      
        if(result.ok){
            setNotification("Login Successful... Please Wait")
            const response= await result.json() 
            const token= response.token

            window.localStorage.setItem("social-credential", token)
            window.localStorage.setItem("social-email", formData.email)
            setTimeout(()=>{
                window.location.href= "/posts"
            }, 2000)
        }
    }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{maxWidth: "400px", height: "100vh"}}>
      <div
        className="card text-white bg-primary mb-3"
        style={{ maxWidth: "20rem" }}
      >
        
        <div className="card-body">
          <h4 className="card-title">Log In</h4>
          
            <form onSubmit={onSubmitHandler}>
              <fieldset>
                <div>
                  <label className="form-label mt-4">Email address</label>
                  <input
                  onChange={onChangeHandler}
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                  />
                  <small className="form-text text-white">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div>
                  <label
                    
                    className="form-label mt-4"
                  >
                    Password
                  </label>
                  <input
                  onChange={onChangeHandler}
                    type="password"
                    className="form-control"
                    name= "password"
                    placeholder="Password"
                    
                  />
                </div>

                <button type="submit" className="btn btn-secondary mt-4">
                  Log In
                </button>
                
                <button type="button" onClick={registerButton} className="btn btn-info mt-4 ms-3">
                  Register
                </button>
              </fieldset>
            </form>
          <p className="mt-3"> {notification} </p>
        </div>
      </div>
    </div>
  );
};
