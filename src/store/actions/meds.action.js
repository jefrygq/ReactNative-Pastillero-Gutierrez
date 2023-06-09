import {API_URL} from '../../constants/firebase';
import * as FileSystem from 'expo-file-system';
import { createReminders, deleteReminders, regenerateReminders } from './reminders.action';

export const SELECTED_MED = 'SELECTED_MED';
export const ADD_MED = 'ADD_MED';
export const UPDATE_MED = 'UPDATE_MED';
export const DELETE_MED = 'DELETE_MED';
export const GET_MEDS = 'GET_MEDS';
export const FILTERED_MEDS = 'FILTERED_MEDS';

export const selectedMed = id => (
  {
    type: SELECTED_MED,
    medId: id
  }
);

export const addMed = data => {
  return async dispatch => {
    try {
      data.imageFront = saveImageToDevice(data.imageFront);
      data.imageBack = saveImageToDevice(data.imageBack);
      data.imageMed = saveImageToDevice(data.imageMed);

      const response = await fetch(`${API_URL}/meds/${data.userId}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('add ajax result:');
      console.log(result);

      dispatch({
        type: ADD_MED,
        medId: result.name
      });

      // create med reminders
      dispatch(createReminders({med: {...data, id: result.name}, userId: data.userId}))
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateMed = data => {
  return async dispatch => {
    try {
      const response = await fetch(`${API_URL}/meds/${data.userId}/${data.key}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.med)
      });

      const result = await response.json();
      console.log('update ajax result:');
      console.log(result);

      dispatch({
        type: UPDATE_MED,
        medId: result.name
      });

      // regenerate med reminders
      dispatch(regenerateReminders({med: data.med, userId: data.userId}));
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteMed = data => {
  return async dispatch => {
    try {
      const response = await fetch(`${API_URL}/meds/${data.userId}/${data.med.id}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const result = await response.json();
      console.log('delete ajax result:');
      console.log(result);

      // delete existing reminders for user/med
      const deleteResult = await deleteReminders(data);
      console.log('delete ajax result:');
      console.log(deleteResult);

      dispatch({
        type: DELETE_MED,
        medId: data.med.id
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getMeds = data => {
  return async dispatch => {
    try {
      const response = await fetch (`${API_URL}/meds/${data.userId}.json`,
      {
        method: 'GET',
        headers: {
          'Content-TYPE': 'application/json'
        }
      });
      
      const result = await response.json();
      // console.log('retrieved meds:');
      // console.log(result);

      let meds = [];
      if(result != null) {
        meds = Object.keys(result).map(key => ({
          ...result[key],
          id: key
        }));
      }
      // console.log(meds);

      dispatch({ type: GET_MEDS, meds: meds });
    } catch (error) {
      console.log(error);
    }
  }
};

export const filteredMeds = category => (
  {
    type: FILTERED_MEDS,
    categoryId: category
  }
);


const saveImageToDevice = image => {
  if(image) {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
        FileSystem.moveAsync({
            from: image,
            to: newPath
        });

        return newPath;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
  return '';
}