import { users } from "../data/users";
import { User, UserResult } from "../interfaces/User";

export function getUsers(limit: number, offset: number): UserResult {
    if (isNaN(limit) || isNaN(offset)) return {
        users,
        limit,
        offset,
        count: users.length
    }
    return {
        users: users.slice(offset, offset + limit),
        limit,
        offset,
        count: users.length
    }
}

export const createUser = (user: { name: string, email: string }): User => {
    const newUser = {
        id: users.length + 1,
        ...user
    }
    users.push(newUser);
    return newUser;
};

export const updateUser = ({ id, email, name }: { id: number, name?: string, email?: string }): User | null => {
    const user = users.find(user => user.id == id)
    if (!user) return null;
    if (email) user.email = email;
    if (name) user.name = name;
    return user
}

export const deleteUser = (id: number): User | null => {
    const user = users.find(user => user.id == id)
    if (!user) return null;
    users.splice(users.indexOf(user), 1);
    return user
}