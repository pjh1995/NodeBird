import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images, content }) => {
  const [showImagesZoom, setShowImageszoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageszoom(true);
  }, []);

  // eslint-disable-next-line react/prop-types
  const Image = ({ src, width = 50 }) => {
    return (
      <img
        role="presentation"
        src={`http://localhost:3065/${src}`}
        alt={content}
        width={`${width}%`}
        height="100%"
        onClick={onZoom}
        style={{ width: `${width}%`, display: 'inline-block' }}
      />
    );
  };

  const onClose = useCallback(() => {
    setShowImageszoom(false);
  }, []);

  return (
    <>
      <Image src={images[0].src} width={images.length === 1 ? 100 : 50} />
      {images.length === 2 && <Image src={images[1].src} />}
      {images.length > 2 && (
        <div
          role="presentation"
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더 보기
        </div>
      )}
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
  content: PropTypes.string,
};

export default PostImages;
