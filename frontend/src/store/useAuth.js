import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";
import { data } from "react-router-dom";

const useAuth = create((set) => ({
  isLoading: false,
  currentUser: null,

  signup: async (data) => {
    const res = await axiosInstance.post("auth/signup", data);
    console.log(res);
  },
  signin: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("auth/signin", data);
      set({ currentUser: res.data.message });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("auth/checkAuth");
      set({ currentUser: res.data.message });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  signout: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("auth/logout");
      set({ currentUser: null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  googleAuth: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("auth/googleAuth", data);
      set({ currentUser: res.data.message });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  logout:async ()=>{
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("auth/logout");
      set({ currentUser: null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuth;
