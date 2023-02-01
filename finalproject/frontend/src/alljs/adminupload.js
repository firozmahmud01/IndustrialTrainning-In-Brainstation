
import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from '@mui/material';
import { uploadbabyfood } from './AllApi';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [imageFile, setImageFile] = useState();
  const [productPrice, setProductPrice] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPoints, setProductPoints] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!productName) errors.productName = 'Product name is required';
    if (!productImage) errors.productImage = 'Product image URL is required';
    if (!productPrice) errors.productPrice = 'Product price is required';
    if (!productBrand) errors.productBrand = 'Product brand is required';
    if (!productPoints) errors.productPoints = 'Product points are required';
    if (!productDetails) errors.productDetails = 'Product details is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err=validateForm()
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setIsLoading(true);
      const base64Image = await toBase64(imageFile);
      const data = {
        name:productName,
        img: base64Image,
        prize:productPrice,
        brand:productBrand,
        pointmsg:productPoints,
        details:productDetails
      };
      await uploadbabyfood(data,setIsLoading)
    }
  };

  const toBase64 = (url) =>{
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            resolve(fileLoadedEvent.target.result)
        }
        fileReader.readAsDataURL(url);
    });

}
    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h3' sx={{margin:'10px'}}>Upload Food Details:</Typography>
          <Box m={2}>
            <TextField
            fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              error={!!errors.productName}
              helperText={errors.productName}
            />
          </Box>
          <Box m={2}>
            <Typography>Product Image:</Typography>
            <TextField
                fullWidth
                value={productImage}
                type='file'
                accept='image/*'
                onChange={(e) => {
                    setImageFile(e.target.files[0])
                    setProductImage(e.target.value)
                }}
                error={!!errors.productImage}
                helperText={errors.productImage}
            />
          </Box>
          <Box m={2}>
            <TextField
                fullWidth
                label="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                error={!!errors.productPrice}
                helperText={errors.productPrice}
            />
          </Box>
          <Box m={2}>
            <TextField
                fullWidth
                label="Product Brand"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
                error={!!errors.productBrand}
                helperText={errors.productBrand}
            />
          </Box>
          <Box m={2}>
            <TextField
                fullWidth
                label="Product Points (comma separated)"
                value={productPoints}
                onChange={(e) => setProductPoints(e.target.value)}
                error={!!errors.productPoints}
                helperText={errors.productPoints}
            />
            </Box>
            <Box m={2}>
            <TextField
                fullWidth
                label="Product Details"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                error={!!errors.productDetails}
                helperText={errors.productDetails}
            />
          </Box>
          <Box m={2}>
            <Button type="submit" disabled={isLoading} sx={{marginLeft:'50%',transform:'translateX(-50%)',width:'300px'}}>
              Submit
            </Button>
          </Box>
        </form>
      );
    };
    
    export default ProductForm;
    