import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import UseSecureAxios from "./UseSecureAxios";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
  const {user}=useContext(AuthContext)
   
  const[axiosSecure]=UseSecureAxios()

  const {data:isAdmin}=useQuery({
    queryKey:['isAdmin',user?.email],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);// Use Your Api     
        return res.data
    }
  })
     return [isAdmin]
};

export default useAdmin;

