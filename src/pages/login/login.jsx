import "./login.css"
const Login = () => {
  return (
    <div className="login-page">
      <div className="auth-card">
        <h2 className="head-center">Login</h2>
        <label for="name" className="basic-input-label">
          Email address*
        </label>
        <input
          type="text"
          className="basic-input"
          placeholder="Enter email id"
        />
        <label for="name" className="basic-input-label margin-top-1">
          Password*
        </label>
        <input type="password" className="basic-input" placeholder="********" />
        <div className="flex-sp-btw margin-top-1">
          <div className="div">
            <input type="checkbox" className="check-box" />
            <label for="Remember me">Remember me</label>
          </div>
          <p className="color-info">Forgot your Password?</p>
        </div>
        <button className="login-btn margin-top-1">
          <b> Login</b>
        </button>
        <p className="margin-top-1 center-text">
          <a href="./signup.html" className="no-decoration color-black-light">
            Create New Account
          </a>
        </p>
      </div>
    </div>
  );
};

export {Login}
