
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import {Card as GridCard} from '@opensource/bit-scope.card'


export default function CardDetail(props) {
  const {date,link,title,excerpt,image,creator} = props;
  var strippedHtml = excerpt.replace(/<[^>]+>/g, '');
  return (
    // Created separte component for displaying one card
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     component="img"
    //     alt="green iguana"
    //     height="140"
    //     image={image}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //     {title ? <div className='title'>{title}</div> : ""}
    //     </Typography>
    //     <Typography gutterBottom variant="h5" component="div" size="small">
    //     {date ? <div className='text'>{date}</div> : ""}
    //     </Typography>
    //     <Typography gutterBottom variant="h5" component="div" size="small">
    //     <strong>Excerpt</strong> {excerpt ? <div className='text'>{parse(excerpt)}</div> : ""}
    //     </Typography>
    //     <Typography gutterBottom variant="h5" component="div" size="small">
    //       <strong>Creator</strong> {creator ? <div className='text'>{creator}</div> : ""}
    //     </Typography>
    
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small"><a target="_blank" href={link} >Open</a></Button>
    //   </CardActions>

    // </Card>
    <GridCard
          cardTitle={title}
          cardActions="false"
          cardType="MEDIA_CARD"
          cardContent={strippedHtml }
          cardImage ={image}
          lightboxButtonTitle="Read more"
          lightboxTitle=" Card | Info" />

  );
}