import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import moment from 'moment';

import { Button, Card, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import styled from 'styled-components';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import CustomAvatar from './CustomAvatar';

import { REMOVE_POST, LIKE_POST, UN_LIKE_POST, RETWEET_POST } from '../reducers/post';

moment.locale('ko');

const PostCardStyled = styled.div`
  margin-bottom: 20px;
  .date {
    float: right;
  }
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST.REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UN_LIKE_POST.REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, [commentFormOpend]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST.REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_POST.REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <PostCardStyled>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} content={post.content} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" onClick={onUnLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : ''}
        extra={id && id !== post.User.id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} content={post.Retweet.content} />}
          >
            <div className="date">{moment(post.Retweet.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={<CustomAvatar User={post.Retweet.User} />}
              title={post.Retweet.User.nickname}
              description={post.Retweet.content && <PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div className="date">{moment(post.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={<CustomAvatar User={post.User} />}
              title={post.User.nickname}
              description={post.content && <PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpend && (
        <div>
          {id && <CommentForm post={post} />}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<CustomAvatar User={item.User} />}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </PostCardStyled>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    Likers: PropTypes.arrayOf(PropTypes.object),
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.object,
  }).isRequired,
};
export default PostCard;
