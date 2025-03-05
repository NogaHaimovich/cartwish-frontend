import React, { useState } from "react"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import "./LoginPage.css"
import { getUser, signin } from "../../Services/userServices"
import { Navigate, useLocation } from "react-router-dom"

const schema = z.object({
    email: z.string().email({message:"Please enter valid email addredd."}).min(3),
    password: z.string().min(8, {message: "Password should be at least 8 charactres."}),
});

const LoginPage = () => {
    const location = useLocation();
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)} )
    const [formError, setFormError] = useState("")
    
    const onSubmit = async(FormData) => {
        try {
            await signin(FormData)
            const {state} = location
            window.location = state ? state.form :"/";
        } catch (err) {
            if(err.response && err.response.status === 400){
                setFormError(err.response.data.message)
            }
        }
    }

    if (getUser()){
        return <Navigate to="/" />
    }

    return (
        <section className="align_center form_page">
            <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login Form</h2>
                <div className="form_inputs">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            className="form_text_input" 
                            placeholder="enter your email"
                            {...register("email")}
                        />
                        {errors.email &&(
                            <em className="form_error">
                                {errors.email.message}
                            </em>
                        )}
                    </div>
                    <div>
                        <label htmlFor="passwoed">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            className="form_text_input" 
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password &&(
                            <em className="form_error">
                                {errors.password.message}
                            </em>
                        )}
                    </div>
                    {formError && <em className="form_error">{formError}</em>}
                    <button type="submit" className="general_button form_submit">Submit</button>
                </div>
            </form>
        </section>
    )
}
export default LoginPage 