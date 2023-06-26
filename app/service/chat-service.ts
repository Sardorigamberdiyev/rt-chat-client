import axios, { AxiosInstance } from 'axios';
import { IRoomModel } from '../models/room.model';
import { IChatService } from './chat-service.interface';
import { IUserModel } from '../models/user.model';
import { IMessageModel } from '../models/message.model';

export class ChatService implements IChatService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({ baseURL: 'http://localhost:5000/api/' });
    }

    public async getRooms() {
        const result = await this.api.get<IRoomModel[]>('/rooms/');
        return result.data;
    }

    public async getRoomById(roomId: number) {
        const result = await this.api.get<IRoomModel>(`/rooms/${roomId}`);
        return result.data;
    }

    public async getMessages(roomId: number) {
        const result = await this.api.get<IMessageModel[]>(`/messages/?roomId=${roomId}`);
        return result.data;
    }

    public async getUsers() {
        const result = await this.api.get<IUserModel[]>('/users/');
        return result.data;
    }

    public async getUserById(userId: number) {
        const reuslt = await this.api.get<IUserModel>(`/users/${userId}`);
        return reuslt.data;
    }

    public async addRoom(roomName: string) {
        const result = await this.api.post<IRoomModel>('/rooms/', {roomName});
        return result.data;
    }

    public async connectUser(username: string, roomId: number) {
        const result = await this.api.post<IUserModel>('/users/connect', { username, roomId });
        return result.data;
    }

    public async registerUser(username: string) {
        const reuslt = await this.api.post<IUserModel>('/users/', {username});
        return reuslt.data;
    }

    public async joinUserRoom(userId: number, roomId: number) {
        const result = await this.api.patch<IUserModel>('/users/joinRoom', {userId, roomId});
        return result.data;
    }
}