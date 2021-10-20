import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/apiRequests';
import { Grid } from '@mui/material';
import ProductCarousel from '../components/Product/ProductCarousel';
import ProductDetails from '../components/Product/ProductDetails';

const ProductContainer = () => {
  const [data, setData] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getProduct(id).then(response => setData(response.data))
  }, [])

  return (
      <Grid container justifyContent="space-around" marginY={2}>
        <Grid item xs={12} lg={5}>
          <ProductCarousel/>
        </Grid>

        <Grid item xs={12} lg={5}>
          <ProductDetails {...data}/>
        </Grid>

      </Grid>
  );
};

export default ProductContainer;
