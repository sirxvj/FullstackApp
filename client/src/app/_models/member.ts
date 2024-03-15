import { Photo } from "./photo"

export interface Member {
    id: number
    username: string
    photoUrl: string
    description: string
    createdAt: string
    lastActive: string
    photos: Photo[]
  }
  
 