import toast from "react-hot-toast";
import { apiConnector } from "../components/Services/apiConnector";
import { studentEndpoints, settingsEndpoints} from "../components/Services/apis";
import { setPaymentLoading } from "../components/slices/courseSlice";
import { resetCart } from "../components/slices/cartSlice";
import { setUser } from "../components/slices/profileSlice";
import {logout} from "../components/Services/operations/authAPI"

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} =studentEndpoints;
const {UPDATE_DISPLAY_PICTURE_API}=settingsEndpoints

export function updateDisplayPicture(token, formData) {
    console.log(formData)
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
     
      try {
        const response = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
}

function loadScript(src){
    return new Promise((resolve)=>{
        const script= document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    // console.log(token);
    // console.log(courses);
   const toastId= toast.loading("Loading...");
   try{
    //load the script
    const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if(!res){
        toast.error("Razorpay SDK failed to load");
        return;
    }

    //initiate the order
    const orderResponse= await apiConnector("POST",COURSE_PAYMENT_API,
                         {courses},
                         {
                            Authorisation: `Bearer ${token}`,
                         }
    )
    // console.log(orderResponse)
    if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message);
    }

    //options
    const options={
        key:process.env.RAZORPAY_KEY,
        currency: orderResponse.data.currency,
        amount: `${orderResponse.data.amount}`,
        order_id:orderResponse.data.orderId,
        name:"Ednexx",
        description:"Thank Your for purchasing the course",
        prefill:{
            name:`${userDetails.firstName}`,
            email: userDetails.email
        },
        handler: function(response){
            //send successfull wala mail
            sendPaymemtSuccessEmail(response, orderResponse.data.amount, token);
            //verify Payment
            verifyPayment({...response,courses}, token, navigate, dispatch);
        }

    }

    const paymentObject= new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment failed", function(response){
        toast.error("oops.payment failed");
        console.log(response.error)
    })
   }
   catch(error){
       console.log("PAYMENT API ERROR..",error);
       toast.error("Could not make Payment");
   }
   toast.dismiss(toastId);
}

async function sendPaymemtSuccessEmail( response, amount, token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorisation:`Bearer ${token}`
        }
    )
    }
    catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR")
    }
}

//verify payment 
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId= toast.loading("Verifying Payment");
    dispatch(setPaymentLoading(true))
    try{
        const response=await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorisation: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successfull, You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart())
    }
    catch(error){
        console.log("PAYMENT VERIFY ERROR...",error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}