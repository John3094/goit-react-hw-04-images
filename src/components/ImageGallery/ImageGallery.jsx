import React from 'react';
import PropTypes from 'prop-types';
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

ImageGallery.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
