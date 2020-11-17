import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { UNFOLLOW_TYPE, BLOCK_FOLLOWER_TYPE } from '../reducers/user';

// const FollowListWrap = styled(List)`
//   margin-bottom: 20px;
// `;

// const loadMoreWrap = styled.div`
//   text-align: center;
//   margin: 10px 0;
// `;

// const ListItem = styled(List.Item)`
//   margin-top: 20px;
// `;

const FollowList = ({ data, isfollower }) => {
  const dispatch = useDispatch();
  const header = <div>{isfollower ? '팔로워' : '팔로잉'}</div>;
  const grid = { gutter: 4, xs: 2, md: 3 };

  const loadMore = () => {
    return (
      <div style={{ textAlign: 'center', magin: '10px 0' }}>
        <Button>더 보기</Button>
      </div>
    );
  };

  const onCancel = (id) => () => {
    const TYPE = isfollower ? BLOCK_FOLLOWER_TYPE : UNFOLLOW_TYPE;

    dispatch({
      type: TYPE.REQUEST,
      data: id,
    });
  };
  return (
    <List
      style={{ marginBottom: '20px' }}
      grid={grid}
      size="small"
      header={header}
      loadMore={loadMore}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: '20px' }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  data: PropTypes.array.isRequired,
  isfollower: PropTypes.bool,
};

export default FollowList;
