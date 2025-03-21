import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DashboardState = {
  widgets: string[];
};

const initialState: DashboardState = {
  widgets: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<string>) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(widget => widget !== action.payload);
    },
    reorderWidgets: (state, action: PayloadAction<string[]>) => {
      state.widgets = action.payload;
    }
  },
});

export const { addWidget, removeWidget, reorderWidgets } = dashboardSlice.actions;
export default dashboardSlice.reducer;