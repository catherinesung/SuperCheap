export interface User {
    provider: string;
    id: string;
    idToken?: string;
    name: string;
    image: string;
    email: string;
    token?: string;
}
