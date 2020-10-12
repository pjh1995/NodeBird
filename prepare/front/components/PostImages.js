import React from "react";
import PropTypes from "prop-types";

const PostImages = ({ images }) => {
  return (
    <div>
      {images.map((image) => (
        <img key={image.src} src={image.src}></img>
      ))}
    </div>
  );
};
PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ),
};
export default PostImages;
