import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column("text")
  userFirstname: string

  @Column("text")
  userLastname: string

  @Column("text")
  userUsername: string

  @Column("text")
  userPassword: string

  @Column("text")
  userMail: string

  @Column("text")
  userLastNotificationDate: string

  @Column("text")
  createdAt: string

  @Column("text")
  deletedAt: string
}
