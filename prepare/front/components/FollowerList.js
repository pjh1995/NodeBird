import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const FollwerList = ({ header, data }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{header}</title>
      </Head>
    </>
  );
};

FollwerList.propTypes = {
  header: PropTypes.node.isRequired,
  data: PropTypes.any,
};

export default FollwerList;
