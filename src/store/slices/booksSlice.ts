import { BookItemProps } from "@/types/bookType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  items: BookItemProps[],
  totalItems: number,
  isLoading: boolean,
  bookDetails: any, // конкретная книга
};

const initialState = {
    items: [],
    totalItems: 0,
    isLoading: false,
    bookDetails: {}
} as CounterState;

export const books = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks: (state, action: PayloadAction<{items: BookItemProps[]; totalItems: number}>) => {
        state.items = action.payload.items;   
        state.totalItems = action.payload.totalItems;   
    },
    bookDetails: (state, action:PayloadAction<BookItemProps>) => {
        state.bookDetails = action.payload;
    },
    addIntoArray: (state, action:PayloadAction<BookItemProps[]>) => {
       state.items = [...state.items, ...action.payload];
    },
    loading: (state, action:PayloadAction<boolean>) => {
        state.isLoading = action.payload;
    },
  },
});

export const {addBooks, bookDetails, addIntoArray, loading} = books.actions;
export default books.reducer;
