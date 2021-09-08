import { VoteType } from './vote-type';
export interface VotePayload {
    voteType: VoteType;
    postId  : number;
}