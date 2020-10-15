import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const hashTagReg = /(#[^\s#]+)/g;
const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(hashTagReg).map((v, i) => {
        if (v.match(hashTagReg)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
