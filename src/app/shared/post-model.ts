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
    createdDate: string;
    voteCount: number;
    commentCount: number;
    upVote: boolean;
    downVote: boolean;
}