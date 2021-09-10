/**
 * A post tile would show up the following information
 */
export interface PostModel {
    id: number;
    postname: string;
    url: string;
    description: string;
    username: string;
    subname: string;
<<<<<<< HEAD
    duration: string;
=======
    createdDate: string;
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
    voteCount: number;
    commentCount: number;
    upVote: boolean;
    downVote: boolean;
}