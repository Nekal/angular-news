import {User} from './User';

export class Message {
  id: number;
  content: string;
  userId: number;
  status: string;
  recipientId: number;
  createdAt: Date;
  User: User;
}
