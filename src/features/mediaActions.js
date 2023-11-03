const initialState = {
  mediaType: 'movie',
  prevMediaType: null,
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MEDIA_TYPE':
      return {
        ...state,
        prevMediaType: state.mediaType,
        mediaType: action.payload,
      };
    default:
      return state;
  }
};

export default mediaReducer;