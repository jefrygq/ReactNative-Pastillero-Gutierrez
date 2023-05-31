import {API_URL} from '../../constants/database';

export const SELECTED_MED = 'SELECTED_MED';
export const ADD_MED = 'ADD_MED';
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
      const response = await fetch(`${API_URL}/meds.json`, {
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
        meds: result
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getMeds = data => {
  return async dispatch => {
    try {
      const response = await fetch (`${API_URL}/meds.json`,
      {
        method: 'GET',
        headers: {
          'Content-TYPE': 'application/json'
        }
      });
      
      const result = await response.json();
      console.log('retrieved meds:')
      console.log(result);

      const meds = Object.keys(result).map(key => ({
        ...result[key],
        id: key
      }));
      console.log(meds);

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