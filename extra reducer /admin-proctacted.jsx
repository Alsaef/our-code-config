import { useAdminStatusQuery } from '@/lib/Redux/Apis/adminApi/AdminApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminProtact = (user) => {

    const router = useRouter();
    const { data: adminVerify, isLoading, isError } = useAdminStatusQuery(user?.email);
  
    useEffect(() => {
      if (!isLoading && !isError) {
        if (!adminVerify?.admin) {
          router.push('/'); // Redirect if not an admin
        }
      }
    }, [isLoading, isError, adminVerify, router]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error loading admin status. Please try again later.</div>;
    }
};

export default AdminProtact;
