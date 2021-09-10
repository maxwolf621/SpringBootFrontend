<<<<<<< HEAD

export interface LoginResponse {
    token: string;
    refreshToken: string;
=======
export interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    // Token's expiration
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
    expiresAt: Date;
    username: string;
}