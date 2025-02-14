import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { pass, auth } from "../apis";
import toast from "react-hot-toast";
// import { setSignupData } from '../../slices/authSlice';

export function getPasswordResetToken (email ,setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
          const response = await apiConnector("POST", pass.RESET_PASSWORD_API,{email});

          console.log("RESET PASSWORD TOKEN RESPONSE...",response);

          if(!response.data.success){
            throw new Error(response.data.message)
          }

          toast.success("Reset Email Sent");
          setEmailSent(true);
          
        }
        catch(error){
          console.log("Reseet Password Token Error...")
          toast.error("Error in Reset Password Token");
        }
        dispatch(setLoading(false));
    }
}
// loader generator for loading

export function resetPassword (password, confirmPassword , token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
          const response = await apiConnector("POST", pass.RESET_PASS_API, {password, confirmPassword, token}) ;

          console.log("RESET PASSWORD RESPONSE...",response);

          if(!response.data.success){
            throw new Error(response.data.message)
          }

          toast.success("Password Changed Successfully");
          
        }
        catch(error){
          console.error("RESET PASSWORD ERROR:", error.response ? error.response.data : error.message);
          toast.error("Error in Reset Password");
        }
        dispatch(setLoading(false));
    }
}

export function sendotp (email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", auth.SENDOTP_API ,{
                email,
                checkUserPresent: true,
            })

            console.log("SENDOTP API..", response);

            if(!response.data.success){
                throw new Error(response.data.message)
              }

            toast.success("OTP Sent Successfully")
            navigate("/signup/verify-email");
        }
        catch(error){
          console.error("SEND OTP API ERROR:", error.response ? error.response.data : error.message);
          toast.error("Could Not Send OTP") 
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
   }
}

export function login( email, password, navigate){
    return async (dispatch) => {
      const toastId = toast.loading("Loading");
      dispatch(setLoading(true));
      try{
          const response = await apiConnector("POST", auth.LOGIN_API ,{
            email, password })

          console.log("LOGIN API..", response);

          if(!response.data.success){
              throw new Error(response.data.message)
            }

          toast.success("Login Successful");
          dispatch(setToken(response.data.token));
          const userImage = response?.data?.user.image ? response.data.user.image :
          `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
          dispatch(setUser({...response.data.user, image: userImage}));
          localStorage.setItem ("token", JSON.stringify(response.data.token));
          localStorage.setItem ("user", JSON.stringify(response.data.user))
          navigate("/");
        }
        catch(error){
          console.log("LOGIN API ERROR..")
          toast.error("Could Not Login") 
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.SIGNUP_API, {
        accountType, firstName, lastName, email, password, confirmPassword, otp
      });

      console.log("SIGNUP API..", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signed Up Successfully");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR:", error.response ? error.response.data : error.message);
      toast.error("Could Not Signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout (navigate){
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  }
}
