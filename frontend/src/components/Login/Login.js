import React from 'react';
import { useState, useEffect } from 'react';
import './login.scss';
import logoVertical from '../../images/logo/vertical-green.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdCancel } from 'react-icons/md';

function Login(prop) {
  const [user, setUser] = useState([
    {
      email: '',
      password: '',
    },
  ]);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = {
        email: user.email,
        password: user.password,
      };
      const url = window.location.href;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(data => {
          window.localStorage.setItem(
            'userAuthenticated',
            data.isAuthenticated
          );
          const apiAuth = window.localStorage.getItem('userAuthenticated');
          setAuthenticated(apiAuth);
          if (data.isAuthenticated) {
            window.localStorage.setItem(
              'accessUserToken',
              data.accessUserToken
            );
            window.location = '/';
            setAuthenticated(data.isAuthenticated);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();

  const handleSSOFB = () => {
    const id = localStorage.getItem('editID');
    try {
      const body = {
        editID: id,
      };

      const handleRequest = async () => {
        const response = await fetch('/sso', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'fetched') {
              window.location = '/';
            }
          });
      };
      handleRequest();
    } catch (error) {
      console.log('Failed to fetch');
    }
  };

  return (
    <div className="login-container">
      <div className="top-container">
        <Link to="/">
          <MdCancel className="cancel" onClick={() => navigate(-1)}></MdCancel>
        </Link>
      </div>
      <div className="login-container-inner">
        <img src={logoVertical} alt=""></img>
        <span className="header">Sign In</span>

        <div className="sso-container">
          <div className="social-method face" onClick={handleSSOFB}>
            <FaFacebookF className="icon"></FaFacebookF>
          </div>
          <Link to="/" className="social-method google">
            <FcGoogle className="icon"></FcGoogle>
          </Link>
        </div>

        <div className="login-separator">
          <div className="space"></div>
          <span>or</span>
          <div className="space"></div>
        </div>

        {/* {(isAuthenticated == true || isAuthenticated == undefined) ? <label className='alert inactive'></label> 
                : <label className='alert'>Your email or password is invalid! Please try again!</label>}
                 */}

        <form className="form-container" onSubmit={onSubmitForm}>
          <input
            className="opacity"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          ></input>
          <input
            className="opacity"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="***********"
          ></input>
          <button className="submit-button" type="submit">
            {' '}
            Submit{' '}
          </button>
        </form>

        <div className="forgot-container">
          <Link
            to={{ pathname: `/${prop.title}/signup` }}
            onClick={prop.updateState}
          >
            No account yet?
          </Link>
          <Link to="">Lost password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
