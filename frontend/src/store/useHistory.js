import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";
const useHistory = create((set) => ({
  history: [],
  isLoadingHistory: false,
  error: null,
  addToHistory: async (id) => {
    set({ isLoadingHistory: true, error: null });
    try {
      const res = await axiosInstance.post("history/", { videoId: id });
      console.log(res);
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to add to history" });
    } finally {
      set({ isLoadingHistory: false });
    }
  },
  getHistory: async () => {
    set({ isLoadingHistory: true, error: null });
    try {
      const res = await axiosInstance.get("history/");
      set({ history: res.data.message });
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to fetch history" });
    } finally {
      set({ isLoadingHistory: false });
    }
  },
  deleteVideo: async (id) => {
    set({ isLoadingHistory: true, error: null });
    try {
      await axiosInstance.delete("history/" + id);
      set((state) => {
        const updatedHistory = state.history.filter(
          (videoId) => videoId !== id 
        );
        return {
          history: updatedHistory, 
        };
      });
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to delete history" });
    } finally {
      set({ isLoadingHistory: false });
    }
  },
  
}));

export default useHistory;
