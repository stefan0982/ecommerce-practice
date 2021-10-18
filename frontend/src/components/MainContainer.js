import React, { useEffect, useState } from 'react';
import { Grid }                       from '@mui/material'

const MainContainer = () => {
  const [data, setData] = useState( [] );

  useEffect( () => {
    // getProducts().then(response => setData(response.data))
    fetch( 'http://localhost:5000/api/products', {mode: 'no-cors'} )
      .then( res => res.json() )
      .then( data => console.log( data ) )
  }, [] );

  console.log( data )

  return (
    <Grid
      container
      justify="center"
    >
      {/*{ data.products.map( ({ node }) => {*/ }
      {/*  return (*/ }
      {/*    <Grid*/ }
      {/*      item*/ }
      {/*      xs={ 6 }*/ }
      {/*      sm={ 4 }*/ }
      {/*      lg={ 3 }*/ }
      {/*      key={ node.id }*/ }
      {/*    >*/ }
      {/*      product*/ }
      {/*    </Grid>*/ }
      {/*  )*/ }
      {/*} ) }*/ }
    </Grid>
  );
};

export default MainContainer;
