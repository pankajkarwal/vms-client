
import * as React from 'react';
import {Card as GridCard} from '@opensource/bit-scope.card'


export default function CardDetail(props) {
  const {title,excerpt,image} = props;
  var strippedHtml = excerpt.replace(/<[^>]+>/g, '');
  return (
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