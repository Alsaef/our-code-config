    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup'); 
// use layout component ......
return(
      { noHeaderFooter || <NavBar></NavBar>}
)
