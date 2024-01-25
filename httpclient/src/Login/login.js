
import './login.css'; // Your CSS file path
import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"

const User = {
    email: 'test@example.com',
    pw: 'test123!@#'
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(false);


    const {id} = useParams();
    console.log(`Page : ${useParams()}입니다 `);
    console.log(`Page : ${id}입니다 `);

  
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        
        if (regex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(password)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }


    }

    const onClickConfirmButton = () => {
        if (email === User.email && password === User.pw) { //데이터 베이스 없으므로 임시
            alert('로그인에 성공했습니다.');
        } else {
            alert('등록되지 않은 회원입니다.');
        }
    }

    useEffect(() => {
        if (emailValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid])
  
    return (
      <div className="login-form-container">
        <header className="login-header">
          <h1>UBISAM</h1>
        </header>
        
        <div className='login-form-content'>
            <div htmlFor="email" className='login-form-title'>이메일</div>
            <div className='login-input-wrap'>
                <input
                    className='login-input'
                    placeholder="email@gmail.com"
                    type='text'
                    value={email}
                    onChange={handleEmail}
                />
            </div>
            <div className='errorMessageWrap'>
                {
                    !emailValid && email.length > 0 && (
                        <div>올바른 이메일을 입력해주세요.</div>
                    )
                }
            </div>
            
            <div htmlFor="password" className='login-form-title'>비밀번호</div>
            <div className='login-input-wrap'>
                <input
            className='login-input'
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePassword}
            />
            </div>
            
            <div className='errorMessageWrap'>
                {
                    !pwValid && password.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
                    )
                }
            </div>
        </div>




        <button onClick={onClickConfirmButton} type="submit" disabled={notAllow} className="login-submit">로그인</button>
        <div>
            <button className="login-register">회원가입</button>
        </div>
        
        
      </div>
    );
  };
export default Login;
