import { ChosenHotelDetail, ChosenHotelParams, ChosenHotelPrices, ChosenHotelRoom } from "../../../app/model/Hotel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Guest {
  name: string,
  title: string,
  id: number,
}
interface GuestState {
  guests: Guest[] | [];
}

const initialState: GuestState = {
  guests: [
    {
      id: 1,
      name: 'Septian',
      title: 'Tn.',
    },
    {
      id: 2,
      name: 'Septiani',
      title: 'Ny.',
    },
  ],
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setGuest: (state, action: PayloadAction<Guest[]>) => {
      state.guests = action.payload;
    },
    deleteGuest: (state, action: PayloadAction<number>) => {
      state.guests = state.guests?.filter(guest => guest.id !== action.payload);
    },
  },
});

export const {setGuest, deleteGuest} = guestSlice.actions;
export default guestSlice.reducer;
