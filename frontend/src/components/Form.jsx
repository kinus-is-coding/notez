import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css"
function Form({route,method}){
    const  [username,setusername]=useState("")
    const  [password,setpassword]=useState("")
    const  [loading,setloading]=useState(false)
    const navigate=useNavigate()
    const name=method==="login"?"Login":"Register"
    const handleSubmit = async (e) => {
        setloading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                alert(res.data.access)
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
                
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setloading(false)
        }
    };
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
        className="form-input" 
        type="text" 
        value={username} 
        onChange={(e)=>setusername(e.target.value)} 
        placeholder="Username"/>
        <input 
        className="form-input" 
        type="text" 
        value={password} 
        onChange={(e)=>setpassword(e.target.value)} 
        placeholder="Password"/>

            {loading && <LoadingIndicator/>}
        <button
        className="form-button"
        type="submit">
        {name}
        </button>
    </form>

}
export default Form