
/**
 * DTO for reset password, forget password, login, sign up
 */
export interface AuthDTO {
    username?: string;
    mail?: string;
    password?: string;
    newPassword?:string;
    oldPassword?:string;
    confirmNewPassword?:string
}
