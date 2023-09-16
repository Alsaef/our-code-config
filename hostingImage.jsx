const ImageApi=`https://api.imgbb.com/1/upload?key=${ImageHosting}`// add your api key
    const onSubmit = data => {
       const formData= new FormData();
       formData.append('image',data.image[0])
       fetch(ImageApi,{
        method:"POST",
        body:formData
       })
       .then(res=>res.json())
       .then(imageResponse=> {
        console.log(imageResponse)
        if(imageResponse.success){
          const ImageUrl=imageResponse.data.display_url
          const {name,category,price,recipe}=data
          const menuItem={name,category,price,recipe,image:ImageUrl}
         console.log(menuItem)
        }
      })
