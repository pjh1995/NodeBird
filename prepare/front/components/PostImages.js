import React from "react";
const PostImages = ({ images }) => {
  return (
    <div>
      {images.map((image) => (
        <img key={image.src} src={image.src}></img>
      ))}
    </div>
  );
};
export default PostImages;
