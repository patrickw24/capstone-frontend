import React from 'react'

export const PostForm = () => {
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
  )
}
