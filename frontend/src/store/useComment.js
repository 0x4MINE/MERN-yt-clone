import { LinkedinIcon } from "lucide-react";
import {create} from "zustand"
import axiosInstance from "../libs/axiosInstance";





 const useComment = create((set)=>({

    comments: [],

    addComment: async (data) => {
        try {
          const res = await axiosInstance.post("comment/add", data);
          console.log(res.data.message.newComment);
          return res.data.message.newComment;
        } catch (error) {
          console.error(error);
        }
      },
     likeComment: async (id) => {
        try {
          const res = await axiosInstance.patch(`comment/like/${id}`);
          console.log(res.data.message);
        } catch (error) {
          console.error(error);
        }
      },
      dislikeComment: async (id) => {
        try {
          const res = await axiosInstance.patch(`comment/dislike/${id}`);
          console.log(res.data.message);
        } catch (error) {
          console.error(error);
        }
      },
     
     
     
     



}))

export default useComment;