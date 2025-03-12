import React from "react";

export const LoginForm = () => {

    const registerButton= ()=>{
        window.location.href= "/register"
    }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{maxWidth: "400px", height: "100vh"}}>
      <div
        className="card text-white bg-primary mb-3"
        style={{ maxWidth: "20rem" }}
      >
        
        <div className="card-body">
          <h4 className="card-title">Log In</h4>
          
            <form>
              <fieldset>
                <div>
                  <label className="form-label mt-4">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" className="form-text text-white">
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
                    type="password"
                    className="form-control"
                    
                    placeholder="Password"
                    
                  />
                </div>

                <button type="submit" className="btn btn-secondary mt-4">
                  Submit
                </button>
                
                <button type="button" onClick={registerButton} className="btn btn-info mt-4 ms-3">
                  Register
                </button>
              </fieldset>
            </form>
          
        </div>
      </div>
    </div>
  );
};
