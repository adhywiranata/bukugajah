import * as ActionTypes from '../constants';

const initialState = require('json!../../public/notes.json');

const addNote = (state, newNoteData) => {
  const newNote = {
    id: state.reduce((maxId, note) => Math.max(note.id, maxId), -1) + 1,
    title: newNoteData.title,
    description: newNoteData.description,
    createdAt: '20-20-2016',
    updatedAt: '21-20-2016',
    tags: ['casual'],
    category: 'work',
    images: ['menma'],
  };

  return [newNote, ...state];
}

const updateNote = (state, updatedNoteData) => {
  let duplicatedState = state.map(note => note);
  const updateNoteId = updatedNoteData.id;
  const updateNoteIndex = duplicatedState.map(note => note.id).indexOf(updateNoteId);
  duplicatedState[updateNoteIndex].title = updatedNoteData.title;
  duplicatedState[updateNoteIndex].description = updatedNoteData.description;
  return duplicatedState;
}

const deleteNote = (state, deletedNoteId) => {
  const duplicatedState = state.map(note => note);
  const deletedNoteIndex = duplicatedState.map(note => note.id).indexOf(deletedNoteId);
  duplicatedState.splice(deletedNoteIndex, 1);
  return duplicatedState;
}

const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE:
      return addNote(state, action.value);
    case ActionTypes.UPDATE_NOTE:
      return updateNote(state, action.value);
    case ActionTypes.DELETE_NOTE:
      return deleteNote(state, action.value);
    default:
      return state;
  }
}

export default NotesReducer;
