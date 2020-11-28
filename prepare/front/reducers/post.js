import produce from 'immer';

import { makeActionType } from './index';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  singlePost: null,
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
  likePostDone: false,
  likePostLoading: false,
  likePostError: null,
  unLikePostDone: false,
  unLikePostLoading: false,
  unLikePostError: null,
  uploadImagesDone: false,
  uploadImagesLoading: false,
  uploadImagesError: null,
  retweetPostDone: false,
  retweetPostLoading: false,
  retweetPostError: null,
};

export const LOAD_POSTS = makeActionType('LOAD_POSTS');

export const loadPostsAction = (data) => {
  return {
    type: LOAD_POSTS.REQUEST,
    data,
  };
};

export const LOAD_USER_POSTS = makeActionType('LOAD_USER_POSTS');

export const LOAD_HASHTAG_POSTS = makeActionType('LOAD_HASHTAG_POSTS');

export const LOAD_POST = makeActionType('LOAD_POST');

export const ADD_POST = makeActionType('ADD_POST');

export const REMOVE_POST = makeActionType('REMOVE_POST');

export const removePostAction = (data) => {
  return {
    type: REMOVE_POST.REQUEST,
    data,
  };
};

export const ADD_COMMENT = makeActionType('ADD_COMMENT');

export const addCommentAction = (data) => {
  return {
    type: ADD_COMMENT.REQUEST,
    data,
  };
};

export const LIKE_POST = makeActionType('LIKE_POST');

export const likePostAction = (data) => {
  return {
    type: LIKE_POST.REQUEST,
    data,
  };
};

export const UN_LIKE_POST = makeActionType('UN_LIKE_POST');

export const UPLOAD_IMAGES = makeActionType('UPLOAD_IMAGES');

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const RETWEET_POST = makeActionType('RETWEET_POST');

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_HASHTAG_POSTS.REQUEST:
      case LOAD_USER_POSTS.REQUEST:
      case LOAD_POSTS.REQUEST: {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      }
      case LOAD_HASHTAG_POSTS.SUCCESS:
      case LOAD_USER_POSTS.SUCCESS:
      case LOAD_POSTS.SUCCESS: {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10 || action.data === 0;
        break;
      }
      case LOAD_HASHTAG_POSTS.FAILURE:
      case LOAD_USER_POSTS.FAILURE:
      case LOAD_POSTS.FAILURE: {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      }
      case LOAD_POST.REQUEST: {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      }
      case LOAD_POST.SUCCESS: {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        // draft.mainPosts = [action.data];
        break;
      }
      case LOAD_POST.FAILURE: {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      }
      case ADD_POST.REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST.SUCCESS: {
        console.log(action.data);
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      }
      case ADD_POST.FAILURE: {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      }
      case REMOVE_POST.REQUEST: {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      }
      case REMOVE_POST.SUCCESS: {
        draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data.PostId);
        console.log(draft.mainPosts);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      }
      case REMOVE_POST.FAILURE: {
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      }
      case ADD_COMMENT.REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT.SUCCESS: {
        const targetPost = draft.mainPosts.find((v) => v.id === action.data.PostId);
        targetPost.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT.FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }
      case LIKE_POST.REQUEST: {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      }
      case LIKE_POST.SUCCESS: {
        const targetPost = draft.mainPosts.find((v) => v.id === action.data.PostId);
        targetPost.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST.FAILURE: {
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      }
      case UN_LIKE_POST.REQUEST: {
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      }
      case UN_LIKE_POST.SUCCESS: {
        const targetPost = draft.mainPosts.find((v) => v.id === action.data.PostId);
        targetPost.Likers = targetPost.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unLikePostLoading = false;
        draft.unLikePostDone = true;
        break;
      }
      case UN_LIKE_POST.FAILURE: {
        draft.unLikePostLoading = false;
        draft.unLikePostError = action.error;
        break;
      }
      case UPLOAD_IMAGES.REQUEST: {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      }
      case UPLOAD_IMAGES.SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES.FAILURE: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      }
      case REMOVE_IMAGE: {
        draft.imagePaths = state.imagePaths.filter((v, i) => i !== action.data);
        break;
      }
      case RETWEET_POST.REQUEST: {
        draft.retweetPostLoading = true;
        draft.retweetPostDone = false;
        draft.retweetPostError = null;
        break;
      }
      case RETWEET_POST.SUCCESS: {
        draft.retweetPostLoading = false;
        draft.retweetPostDone = true;
        draft.mainPosts.join(action.data);
        break;
      }
      case RETWEET_POST.FAILURE: {
        draft.retweetPostLoading = false;
        draft.retweetPostError = action.error;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
