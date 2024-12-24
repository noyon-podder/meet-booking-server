/* eslint-disable @typescript-eslint/no-explicit-any */
import { Favorite } from './favorite.model'

// ADD FAVORITE TO DB
const addFavoriteFromDb = async (userId: string, roomId: any) => {
  let isFavorite = await Favorite.findOne({ userId })

  if (!isFavorite) {
    isFavorite = await Favorite.create({ userId, rooms: [roomId] })
  } else {
    if (!isFavorite.rooms.includes(roomId)) {
      isFavorite.rooms.push(roomId)
      await isFavorite.save()
    }
  }
  return isFavorite
}

// REMOVE FAVORITE FROM DB
const removeFavoriteFromDB = async (userId: string, roomId: any) => {
  const favorite = await Favorite.findOne({ userId })

  if (favorite) {
    favorite.rooms = favorite.rooms.filter((id) => id.toString() !== roomId)

    await favorite.save()
  }

  return favorite
}

export const FavoriteServices = {
  addFavoriteFromDb,
  removeFavoriteFromDB,
}
