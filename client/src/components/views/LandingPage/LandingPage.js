import React,{useEffect} from 'react'
import axios from 'axios'

function LodingPage(){

    useEffect(() =>{
        axios.get('/api/hello').then(response => console.log(response))
    },[])

    return (
        <div>
            LodingPage
        </div>
    )
}

export default LodingPage