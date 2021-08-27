import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(
      `fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    allNotificationsRead(state, action) {
      state.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      // state.forEach((notification) => {
      //   notification.isNew = !notification.read;
      // });
      state.push(...action.payload);
      state.sort((a, b) => b.date.localeCompare(a.date));
    },
  },
});

export const { allNotificationsRead } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
export const selectAllNotifications = (state) => state.notifications;
