import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
<<<<<<< HEAD
  // Accept either an array or an updater function
  setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),
=======
  setMessages: (messages) => set({ messages }),
>>>>>>> 6674c8e (project)
}));

export default useConversation;
