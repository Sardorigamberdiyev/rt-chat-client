import { IMessageModel } from '../models/message.model';
import { IRoomModel } from '../models/room.model';
import { IUserModel } from '../models/user.model';

export interface IChatService {
    getRooms(): Promise<IRoomModel[]>;
    getRoomById(roomId: number): Promise<IRoomModel>;
    getUsers(): Promise<IUserModel[]>;
    getMessages(roomId: number): Promise<IMessageModel[]>;
    getUserById(userId: number): Promise<IUserModel>;
    addRoom(roomName: string): Promise<IRoomModel>;
    registerUser(username: string): Promise<IUserModel>;
    joinUserRoom(userId: number, roomId: number): Promise<IUserModel>;
    connectUser(username: string, roomId: number): Promise<IUserModel>;
}