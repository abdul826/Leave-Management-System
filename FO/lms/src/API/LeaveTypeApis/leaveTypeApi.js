import { BASE_URL } from "../helper";
import { commonrequest } from "../commonrequest";

export const fetchAllLeaveTypeData = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/fetchleavetype`,'',header,"admin");
}

export const addLeaveTypeData = async(data,header)=>{
    return await commonrequest('POST',`${BASE_URL}/addleavetype`,data,header,'admin');
}

export const deleteLeaveTypeData = async(data,header)=>{
    return await commonrequest('DELETE',`${BASE_URL}/deleteleavetype/${data}`,{},header,'admin');
}