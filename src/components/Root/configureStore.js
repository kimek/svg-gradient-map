import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import deepClone from '../../helpers/deepClone';

import reducers from '../../store/reducers';
import {initialState as playgroundInitState} from '../../store/reducers/playground';
import {palettes, primitivesData, presetsData} from '../Data';
import {saveState, getState} from './localStorage';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    if (action.type === 'MOVE_DRAG') {
      return rawDispatch(action);
    }

    console.groupCollapsed(action.type);
    console.log('Before:', store.getState());
    console.log('Action:', action);
    const result = rawDispatch(action);
    console.log('After:', store.getState());
    console.groupEnd(action.type);

    return result;
  };
};

const configureStore = () => {
  const dataFromStorage = getState();
  const {primitives, playground} = dataFromStorage;

  const initialState = {
    presetControls: presetsData,
    primitiveControls: primitivesData,
    primitives,
    playground,
    palettes
  };

  const store = createStore(
    reducers,
    initialState
  );

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(
    () => {
      const playgroundToSave = deepClone(store.getState().playground);
      const primitivesToSave = deepClone(store.getState().primitives);

      // Prevent breaking app with too large image in storage
      if (playgroundToSave.image && playgroundToSave.image.sizeMb >= 5) {
        playgroundToSave.image = playgroundInitState.image;
      }

      const primitivesCleared = {
        ...primitivesToSave,
        playground: primitivesToSave.playground,
        palette: primitivesToSave.palette
      };

      saveState({
        primitives: primitivesCleared,
        playground: playgroundToSave
      });
    }
  ), 1000);

  return store;
};

export default configureStore;
