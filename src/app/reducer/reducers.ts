import {combineReducers} from '@reduxjs/toolkit';
import hotelReducer from '../../modules/home/store/hotelReducer';
import guestReducer from "../../modules/guest/store/guestReducer";

const rootReducer = combineReducers({
  chosenHotel: hotelReducer,
  guest: guestReducer,
});

export default rootReducer;
