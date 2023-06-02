import React from 'react';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ collections }) => {
  return (
    <ImageGalleryStyled>
      {collections.map(collection => {
        return <ImageGalleryItem key={collection.id} collection={collection} />;
      })}
    </ImageGalleryStyled>
  );
};
