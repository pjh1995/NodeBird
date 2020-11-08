import shortId from 'shortid'; // objectId 생성
import faker from 'faker';
import produce from 'immer';

import { makeActionType } from './index';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsDone: false,
  loadPostsLoading: false,
  loadPostsError: null,
  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
  removePostDone: false,
  removePostLoading: false,
  removePostError: null,
  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
};

export const LOAD_POSTS_TYPE = makeActionType('LOAD_POSTS');

export const loadPostsAction = (data) => {
  return {
    type: LOAD_POSTS_TYPE.REQUEST,
    data,
  };
};

export const ADD_POST_TYPE = makeActionType('ADD_POST');

export const addPostAction = (data) => {
  return {
    type: ADD_POST_TYPE.REQUEST,
    data,
  };
};

export const REMOVE_POST_TYPE = makeActionType('REMOVE_POST');

export const removePostAction = (data) => {
  return {
    type: REMOVE_POST_TYPE.REQUEST,
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

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_TYPE.REQUEST: {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      }
      case LOAD_POSTS_TYPE.SUCCESS: {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 30;
        break;
      }
      case LOAD_POSTS_TYPE.FAILURE: {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      }
      case ADD_POST_TYPE.REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_TYPE.SUCCESS: {
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      }
      case ADD_POST_TYPE.FAILURE: {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      }
      case REMOVE_POST_TYPE.REQUEST: {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      }
      case REMOVE_POST_TYPE.SUCCESS: {
        draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      }
      case REMOVE_POST_TYPE.FAILURE: {
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      }
      case ADD_COMMENT_TYPE.REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_TYPE.SUCCESS: {
        const post = draft.mainPosts.findIndex(
          (v) => v.id === action.data.PostId,
        );
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_TYPE.FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
