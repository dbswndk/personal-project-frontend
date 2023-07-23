import { create } from 'zustand'
import { BoardMap } from "../entity/BoardMap"

interface BoardState {
  boards: BoardMap[]
  setBoards: (boards: BoardMap[]) => void
}

export const useBoardMapStore = create<BoardState>((set) => ({
  boards: [],
  setBoards: (boards) => set({ boards }),
}))

export default useBoardMapStore