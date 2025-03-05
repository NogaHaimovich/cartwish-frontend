import React, { useEffect } from "react";
import { signOut } from "../../Services/userServices";

const LogOut = () => {
    useEffect(()=>{
        signOut()
        window.location = "/"
    },[])

  return null;
}
export default LogOut 