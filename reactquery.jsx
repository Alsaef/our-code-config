import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
// import UseSecureAxios from './UseSecureAxios';
const UseCard = () => {
    const {user,loading}=useContext(AuthContext)
    const token=localStorage.getItem('user');
    // const [axiosSecure]=UseSecureAxios()
    const {  refetch, data: cart=[] } = useQuery({
        queryKey: ['carts',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await fetch(`http://localhost:3000/carts?email=${user?.email}`, { headers: {
                authorize: `bearer ${token}`
         }})
             return res.json();
        },
      })
  return[cart,refetch]
};

export default UseCard;
