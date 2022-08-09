import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/goals/";

const initialState = {
  allGoals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get all goals
export const getAllGoals = createAsyncThunk(
  "goals/getAllGoals",
  async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL + '/all');
      
        return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const allGoalSlice = createSlice({
  name: "allgoal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allGoals = action.payload;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = allGoalSlice.actions;
export default allGoalSlice.reducer;
