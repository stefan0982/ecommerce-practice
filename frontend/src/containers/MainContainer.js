import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { getProducts } from '../api/apiRequests';
import ProductCard from '../components/Product/ProductCard';

const MainContainer = () => {

  const [ data, setData ] = useState( [] );

  useEffect( () => {
    getProducts()
        .then( response => setData( response.data ) );
  }, [] );

  return (
      <Grid
          container
          alignItems={'center'}
          // justifyItems={'center'}
          justifyContent={'center'}
          spacing={ 2 }
      >
        { data.products?.map(
            ( { description, price, name, brand, _id, createdAt } ) => {
              return (
                  <Grid
                      item
                      xs={ 12 }
                      sm={ 6 }
                      lg={ 4 }
                      key={ _id }
                  >
                    <ProductCard description={ description }
                                 price={ price }
                                 name={ name }
                                 brand={ brand }
                                 createdAt={ createdAt }
                                 id={_id}
                    />
                  </Grid>
              );
            } ) }
      </Grid>
  );
};

export default MainContainer;
