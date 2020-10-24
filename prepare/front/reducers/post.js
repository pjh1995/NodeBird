import shortId from 'shortid'; //objectId 생성

import { makeActionType } from './index';

export const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      User: {
        id: 1,
        nickname: 'jhark',
      },
      content: '첫 번째 게시글 #해시태그',
      Images: [
        {
          src:
            'data:image/jpeg;base64,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',
        },
        {
          src:
            'data:image/png;base64,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',
        },
        {
          src:
            'data:image/png;base64,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',
        },
        {
          src:
            'data:image/png;base64,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',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'hinh',
          },
          content: '반갑짱뽀!',
        },
        {
          User: {
            nickname: 'emmo',
          },
          content: '반갑모!!',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
};

export const ADD_POST_TYPE = makeActionType('ADD_POST');

export const addPostAction = (data) => {
  return {
    type: ADD_POST_TYPE.REQUEST,
    data,
  };
};

export const ADD_COMMENT_TYPE = makeActionType('ADD_COMMENT');

export const addCommentAction = (data) => {
  return {
    type: ADD_COMMENT_TYPE.REQUEST,
    data,
  };
};

const dummyPost = (content) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: 'jhark',
  },
  content,
  Images: [],
  Comments: [],
});

const dummyComment = (content, userId) => ({
  User: {
    id: 1,
    nickname: 'jhark',
  },
  content,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_TYPE.REQUEST: {
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    }
    case ADD_POST_TYPE.SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyPost(action.data.content), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    }
    case ADD_POST_TYPE.FAILURE: {
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    }
    case ADD_COMMENT_TYPE.REQUEST: {
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_TYPE.SUCCESS: {
      const { content, postId, userId } = action.data;
      const postIdx = state.mainPosts.findIndex((v) => v.id === postId);
      const post = { ...state.mainPosts[postIdx] };
      post.Comments = [dummyComment(content, userId), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIdx] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_TYPE.FAILURE: {
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
