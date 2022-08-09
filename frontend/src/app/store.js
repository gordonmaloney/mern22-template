import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import allGoalReducer from '../features/goals/allGoalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    allGoals: allGoalReducer,
  },
})