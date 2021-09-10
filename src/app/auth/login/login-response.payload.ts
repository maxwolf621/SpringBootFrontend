
export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiresAt: Date;
    username: string;
}