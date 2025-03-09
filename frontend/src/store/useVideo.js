import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";

const useVideo = create((set) => ({
  isFetching: false,
  selectedVideo: null,
  videos: [],

  getVideos: async (path) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get(`video${path}`);
      set({ videos: response.data.message });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  selectVideoById: async (id) => {
    try {
      const response = await axiosInstance.get(`video/crud/${id}`);
      console.log(response.data.message);

      set({
        selectedVideo: response.data.message,
        comments: response.data.message.comments,
      });
    } catch (error) {
      console.error(error);
    }
  },
  getVideoById: async (id) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get(`video/crud/${id}`);
      return response.data.message;
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  increaseViews: async (id) => {
    try {
      const response = await axiosInstance.get(`video/view/${id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  },

  searchVideos: async (query) => {
    try {
      const response = await axiosInstance.get(`video/search?query=${query}`);
      console.log(response.data.message);
      set({ videos: response.data.message });
    } catch (error) {
      console.error(error);
    }
  },
  likeVideo: async (id) => {
    try {
      const response = await axiosInstance.patch(`video/like/${id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  },
  dislikeVideo: async (id) => {
    try {
      const response = await axiosInstance.patch(`video/dislike/${id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  },
  subscribe: async (id) => {
    try {
      const response = await axiosInstance.get(`user/subscribe/${id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useVideo;
