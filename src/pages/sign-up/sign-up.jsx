import "../login/login.css"
const SignUp = () =>
{
    return(
        <div className="login-page">
        <div className="auth-card signup-card">
            <h2 className="head-center">Signup</h2>
            <label for="name" className="basic-input-label">Name*</label>
            <input type="text" className="basic-input" placeholder="Enter name" />
            <label for="name" className="basic-input-label margin-top-1">Email address*</label>
            <input type="text" className="basic-input" placeholder="Enter email id" />
            <label for="name" className="basic-input-label margin-top-1">Password*</label>
            <input type="password" className="basic-input" placeholder="********" />
            <label for="name" className="basic-input-label margin-top-1">Conform Password*</label>
            <input type="password" className="basic-input" placeholder="********" />
            <div className="flex-sp-btw margin-top-1">
                <div className="div">
                    <input type="checkbox" className="check-box" /><label for="Remember me">I accept all Terms and Conditions</label>
                </div> 
            </div>
            <button className="login-btn margin-top-1"><b>Create New Account</b></button>
            <p className="margin-top-1 center-text"><a href="./login.html" className="no-decoration color-black-light">Already have an account Account</a></p>

        </div>
    </div>
    )
}

export {SignUp}