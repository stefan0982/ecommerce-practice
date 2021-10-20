import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function ProductCard({description, price, name, brand, createdAt, id}) {

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        action={brand}
        title={name}
        subheader={new Date(Date.parse(createdAt)).toLocaleDateString()}
      />
      <Link to={`/products/${id}`}>
        <CardMedia
          component="img"
          height="194"
          src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="no-photo"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h6" >
          {price} $
        </Typography>
      </CardActions>
    </Card>
  );
}
