import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser } from "../../Services/userServices"
import { Navigate } from "react-router-dom"

import "./SignUpPage.css";
import userImage from "../../assets/user.webp"
import { signup } from "../../Services/userServices";

const schema = z.object({
  name: z.string().min(3, { message: "Name should be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password should be at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password should be at least 8 characters." }),    
  deliveryAddress: z.string().min(15, { message: "Address must be at least 15 characters." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
    const [profilePic, setProfilePic] = useState(null)
    const [formError, setFormError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async(formData) => {
        try {
            await signup(formData, profilePic);
            window.location = "/"

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
        <form className="authentication_form signup_form" onSubmit={handleSubmit(onSubmit)}>
            <h2>SignUp Form</h2>

            <div className='image_input_section'>
                        <div className='image_preview'>
                            <img src={profilePic ? URL.createObjectURL(profilePic): userImage} id='file-ip-1-preview'/>
                        </div>
                        <label htmlFor='file-ip-1' className='image_label'>
                            Upload Image
                        </label>
                        <input
                            className='image_input'
                            type='file'
                            onChange={e => setProfilePic(e.target.files[0])}
                            id='file-ip-1'
                        />
            </div>

            {/* Form Inputs */}
            <div className="form_inputs signup_form_inputs">
                <div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form_text_input"
                        placeholder="Enter your name"
                        {...register("name")}
                    />
                    {errors.name && <em className="form_error">{errors.name.message}</em>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form_text_input"
                        placeholder="Enter your email"
                        {...register("email")}
                    />
                    {errors.email && (
                    <em className="form_error">{errors.email.message}</em>
                    )}
                </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form_text_input"
                        placeholder="Enter your password"
                        {...register("password")}
                    />
                    {errors.password && (
                    <em className="form_error">{errors.password.message}</em>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form_text_input"
                        placeholder="Enter confirm password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                    <em className="form_error">{errors.confirmPassword.message}</em>
                    )}
            </div>

            <div className='signup_textares_section'>
                    <label htmlFor="address">Delivery Address</label>
                    <input
                        type="address"
                        id="deliveryAddress"
                        className="input_textarea"
                        placeholder="Enter delivery address"
                        {...register("deliveryAddress")}
                    />
                    {errors.deliveryAddress && (
                    <em className="form_error">{errors.deliveryAddress.message}</em>
                    )}
            </div>
            </div>
            {formError && <em className="form_error">{formError}</em>}
            <button type="submit" className="general_button form_submit">
            Submit
            </button>
        </form>
        </section>
    );
};

export default SignUpPage;
