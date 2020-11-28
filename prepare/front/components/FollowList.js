import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { UNFOLLOW, BLOCK_FOLLOWER } from '../reducers/user';

const FollowListWrap = styled(List)`
  margin-bottom: 20px;
`;

const ListItem = styled(List.Item)`
  margin-top: 20px;
`;

const LoadMoreWrap = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const FollowList = ({ data, isfollower, onClickMore, loading }) => {
  const dispatch = useDispatch();
  const header = <div>{isfollower ? '팔로워' : '팔로잉'}</div>;
  const grid = { gutter: 4, xs: 2, md: 3 };

  const onCancel = (id) => () => {
    const TYPE = isfollower ? BLOCK_FOLLOWER : UNFOLLOW;

    dispatch({
      type: TYPE.REQUEST,
      data: id,
    });
  };
  return (
    <FollowListWrap
      grid={grid}
      size="small"
      header={header}
      loadMore={
        <LoadMoreWrap>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </LoadMoreWrap>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItem>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

FollowList.propTypes = {
  data: PropTypes.array,
  isfollower: PropTypes.bool,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
