import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductDetails({brand, price, description, createdAt, countInStock}) {
  return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { brand }
          </Typography>
          <Typography variant="h6" component="div">
            {description}
          </Typography>
          <Typography variant="body1"  component="div">
            {countInStock > 0 ? 'In stock' : 'soon'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            { new Date(Date.parse(createdAt)).toLocaleDateString() }
          </Typography>
          <Typography variant="h6">
            {price} $
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
        </CardActions>
      </Card>
  );
}
