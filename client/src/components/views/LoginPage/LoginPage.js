import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser } from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'
function LoginPage(props){

    const dispatch =useDispatch()

    const [Email, setEmail] =useState("")
    const [Password, setPassword] =useState('')

    const onEmailHandler =(event) =>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler =(event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler =(event) =>{
        // 폼 동작시 새로고침이 되는 것을 막기 위한 설정
        event.preventDefault()
        // 이메일과 비밀번호의 정보를 서버에 보내서 확인

        let body={
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
            .then(response =>{
                console.log(response)
                if(response.payload.loginSucces){
                    props.history.push('/')
                }else{
                    alert(response)
                }
            })

    }

    return (
        <div style={{display:"flex", justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
