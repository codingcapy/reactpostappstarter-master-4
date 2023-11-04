import { create } from "zustand"

export const useEditStore = create((set) => ({
    editMode: false,
    toggleEditMode: () => set((state) => ({
        editMode: !state.editMode
    }))
}))