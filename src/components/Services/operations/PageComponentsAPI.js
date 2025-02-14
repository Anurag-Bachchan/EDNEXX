import { apiConnector } from "../apiConnector";
import {toast} from "react-hot-toast";
import { catalogData } from '../apis';

export const CategoryPageDetails = async(categoryId)=>{
    // console.log(categoryId);
    let result = []
    const toastId = toast.loading("Loading..")
    try{
      const response =  await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,  {categoryId: categoryId});
      if(!response.data.success){
        throw new Error(response.data.message)
    }
    result = response.data;
    } catch(error){
      console.log("Catalog Page Api Error",error)
      toast.error(error.message)
      result=error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}