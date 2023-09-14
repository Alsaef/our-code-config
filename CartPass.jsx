import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import UseSecureAxios from './UseSecureAxios';
const UseCard = () => {
    const {user,loading}=useContext(AuthContext)
    const [axiosSecure]=UseSecureAxios()
    const {  refetch, data: cart=[] } = useQuery({
        queryKey: ['carts',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await axiosSecure(`/carts?email=${user?.email}`)  // set your api http//
             return res.data;
        },
      })
  return[cart,refetch]
};

export default UseCard;
