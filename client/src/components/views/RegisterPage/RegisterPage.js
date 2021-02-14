import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser } from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'
function Register(props){
    const dispatch =useDispatch()

    const [Email, setEmail] =useState("")
    const [Password, setPassword] =useState('')
    const [Name, setName] =useState("")
    const [ComfirmPassword, setComfirmPassword] =useState('')

    const onEmailHandler =(event) =>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler =(event) =>{
        setPassword(event.currentTarget.value)
    }
    const onNameHandler =(event) =>{
        setName(event.currentTarget.value)
    }
    const onComfirmPasswordHandler =(event) =>{
        setComfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler =(event) =>{
        // 폼 동작시 새로고침이 되는 것을 막기 위한 설정
        event.preventDefault()
        // 이메일과 비밀번호의 정보를 서버에 보내서 확인다
        if(Password !==  ComfirmPassword){
            alert('비밀번호 확인이 같지 않습니')
        }
        let body={
            email:Email,
            password:Password,
            name:Name
        }

        dispatch(registerUser(body))
            .then(response =>{
                console.log(response.payload)
                if(response.payload.succsee){
                    props.history.push('/')
                }else{
                    alert("회원가입 실패")
                }
            })

    }
    // useEffect(()=>{
    //     console.log(Email,Password)
    // },[Email,Password])

    return (
        <div style={{display:"flex", justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Comfirm Password</label>
                <input type="password" value={ComfirmPassword} onChange={onComfirmPasswordHandler} />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default withRouter(Register)