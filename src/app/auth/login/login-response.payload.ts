export interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    // Token's expiration
    expiresAt: Date;
    username: string;
}