import React, {useEffect}from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_action/user_action'

export default function(SpecificComponent, option, adminRoute =null){

    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false =>로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        // 백엔드로 request를 보내 그 유저의 현재 상태를 확인
        const dispatch = useDispatch()
        useEffect(()=>{
            dispatch(auth())
            Axios.get('/api/users/auth').then(response=>{
                console.log(response)
                if(!response.data.isAuth){
                    // 1. 로그인 하지 않은 상태
                    if(option){
                        props.history('/login')
                    }
                }
                else{
                    // 2. 로그인 한 상태
                    if(adminRoute && !response.data.isAdmin){
                        props.history.push('/')
                    }else{
                        //로그인한 유저가 출입 불가능한 페이지를 들어가지 못하게
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        },[])
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}