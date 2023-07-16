import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ChosenHotelDetail, ChosenHotelParams, ChosenHotelPrices, ChosenHotelRoom } from "../../../app/model/Hotel";

interface HotelState {
  chosenHotelDetail: ChosenHotelDetail | null;
  chosenHotelRoom: ChosenHotelRoom | null;
  chosenHotelParams: ChosenHotelParams | null;
  chosenHotelPrices: ChosenHotelPrices | null;
}

const initialState: HotelState = {
  chosenHotelDetail: null,
  chosenHotelRoom: null,
  chosenHotelParams: null,
  chosenHotelPrices: null,
};

const hotelSlice = createSlice({
  name: 'chosenHotel',
  initialState,
  reducers: {
    setChosenHotelDetail: (state, action: PayloadAction<ChosenHotelDetail>) => {
      state.chosenHotelDetail = action.payload;
    },
    setChosenHotelRoom: (state, action: PayloadAction<ChosenHotelRoom>) => {
      state.chosenHotelRoom = action.payload;
    },
    setChosenHotelParams: (state, action: PayloadAction<ChosenHotelParams>) => {
      state.chosenHotelParams = action.payload;
    },
    setChosenHotelPrices: (state, action: PayloadAction<ChosenHotelParams>) => {
      state.chosenHotelPrices = action.payload;
    },
  },
});

export const {
  setChosenHotelDetail,
  setChosenHotelRoom,
  setChosenHotelParams,
  setChosenHotelPrices,
} = hotelSlice.actions;
export default hotelSlice.reducer;
