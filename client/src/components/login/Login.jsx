/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext } from 'react';
import './login.css';
import Button from '@mui/material/Button';
import { SettingsSystemDaydreamOutlined } from '@mui/icons-material';
import axios from 'axios';
import LoginImage from './assets/Login.png';
import { AppContext } from '../../App.jsx';

export default function Login() {
  const { goToHome } = useContext(AppContext);
  // set state variables below:
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // component functions - event handlers
  const handleLogin = () => {
    axios({
      method: 'post',
      data: {
        // login data
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: '/api/auth/loginlocal',
    })
      .then((res) => {
        if (res.data === 'success') {
          // set user data in state and redirect
          goToHome();
          window.location.reload(true);
        }
      });
  };
  // use Effect:

  // render component:
  return (
    <div
      className="login"
      style={{
        width: '100vw', height: '100vh',
      }}
    >
      <div style={{
        width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'top',
      }}
      >
        <img
          src={LoginImage}
          alt=""
          style={{
            zIndex: '-100',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
          }}
        />
        <h1>QuizKnows</h1>
        <div style={{
          zIndex: '100',
          position: 'absolute',
          display: 'flex',
          width: '18em',
          height: '14em',
          top: '50%',
          left: '40%',
          flexDirection: 'column',
          gap: '.35em',
          color: '#930DFF',
        }}
        >
          {/* This is the Input for the Email */}
          <label htmlFor="email" style={{ fontSize: '1.5em' }}>Email:</label>
          <input
            type="text"
            id="email"
            onChange={(e) => { setLoginEmail(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
            }}
          />
          {/* This is the input for the PassWord */}
          <label htmlFor="email" style={{ fontSize: '1.5em' }}>Password:</label>
          <input
            type="text"
            id="password"
            onChange={(e) => { setLoginPassword(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', fontSize: '1.25em', border: '.5px solid orange',
            }}
          />
          {/* This div holds the login submit button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
          >
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{
                width: '50%',
                marginTop: '10px',
                float: 'right',
                background: '#930DFF',
                ':hover': {
                  bgcolor: '#ff9100', // theme.palette.primary.main
                  color: 'white',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '50%',
                marginTop: '10px',
                float: 'right',
                background: '#930DFF',
                ':hover': {
                  bgcolor: '#ff9100', // theme.palette.primary.main
                  color: 'white',
                },
              }}
            >
              Register
            </Button>
            <div>
              <Button
                variant="contained"
                sx={{
                  width: '382px',
                  height: '90px',
                  marginTop: '10px',
                  float: 'right',
                  background: '#930DFF',
                  ':hover': {
                    bgcolor: '#ff9100', // theme.palette.primary.main
                    color: 'white',
                  },
                }}
                href="/api/auth/google"
                style={{ backgroundImage: 'url(./btn_google_signin_light_normal_web@2x.png)' }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
