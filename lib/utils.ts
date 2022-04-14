import { User } from "firebase/auth";

export const isNewUser = (user: User) => {
    return user.metadata.creationTime === user.metadata.lastSignInTime
}