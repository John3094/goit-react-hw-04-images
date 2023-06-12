import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { ImageGalleryStyled, ImageStyled } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ collection }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageGalleryStyled>
      <ImageStyled
        src={collection.webformatURL}
        alt={collection.tags}
        onClick={toggleModal}
      />
      {showModal && <Modal onClose={toggleModal} imageUrl={collection} />}
    </ImageGalleryStyled>
  );
};

ImageGalleryItem.propTypes = {
  collection: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
