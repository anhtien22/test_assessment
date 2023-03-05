import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "../assets/css/login.css"
import { useNavigate } from 'react-router-dom'
import { useToasts } from "react-toast-notifications";
import { login } from '../redux/actions/userAction';
import { ShowPass } from './helpers/showPass';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const { addToast } = useToasts();

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(login(userLogin, navigate, addToast));
  }

  return (
    <div className="form">
      <div className="form-panel one">
        <div className="form-header">
          <h1>Login</h1>
        </div>
        <div className="form-content">
          <form id="form" onSubmit={ onSubmitLogin }>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={ userLogin.email }
                onChange={ handleChange }
                placeholder='example@gmail.com'
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={ userLogin.password }
                onChange={ handleChange }
                placeholder='Password'
              />
            </div>
            <div className="form-group">
              <label className="form-show">
                <input type="checkbox" onClick={ ShowPass } />Show Password
              </label>
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;