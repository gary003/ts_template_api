import { User } from "../entity/user"
import { connectionTypeORM } from "../connectionFile"
import { DateTime } from "luxon"
import { encryptData } from "../../crypto/functions"

export const getAllUsers = async () => {
  const connection = await connectionTypeORM().catch((err) => console.error(""))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const results: User[] | void = await UserRepository.find({ where: { deletedAt: "" } }).catch((err) => console.error(err))

  await connection.close().catch((err) => console.log(err))

  if (!results) throw new Error("Impossible to retreive any user")

  return results
}

export const getUserById = async (userId: number) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const result: User | void = await UserRepository.findOne({ userId: userId }).catch((err) => console.error(err))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to retreive any user")

  return result
}

export const saveNewUser = async (user: User) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const newUser = new User()
  newUser.userFirstname = user.userFirstname
  newUser.userLastname = user.userLastname
  newUser.userUsername = user.userUsername
  newUser.userPassword = encryptData(user.userPassword)
  newUser.userMail = user.userMail
  newUser.userLastNotificationDate = DateTime.now().toSQL()
  newUser.createdAt = DateTime.now().toSQL()
  newUser.deletedAt = ""

  const UserRepository = connection.getRepository(User)

  const result: User | void = await UserRepository.save(newUser).catch((err) => console.error(err))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to save the new user")

  return result
}

export const updateUser = async (updateData: User): Promise<User> => {
  const { userId, ...valuesToUpdate } = updateData

  if (!userId) throw new Error("Error - invalid data for update")

  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const userToUpdate: User | void = await UserRepository.findOne({ userId }).catch((err) => console.error(err))

  if (!userToUpdate) throw new Error("Impossible to found the requested user to update")

  await UserRepository.merge(userToUpdate, { ...valuesToUpdate })

  const result = await UserRepository.save(userToUpdate).catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to update the values for that user")

  return result
}

export const deleteUserById = async (userId: number) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const userToDelete: User | void = await UserRepository.findOne({ userId: userId }).catch((err) => console.error(err))

  if (!userToDelete) throw new Error("Impossible to found the requested user to delete")

  await UserRepository.merge(userToDelete, { deletedAt: DateTime.now().toSQL() })

  const result: User | void = await UserRepository.save(userToDelete).catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to update delete_at for the user")

  return result
}
