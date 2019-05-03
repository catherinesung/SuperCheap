import { User } from './user';

export interface UserRecord {
    user: User;
    time: Date;
    action: string;
    keyword?: string;
    barcode?: string;
}
