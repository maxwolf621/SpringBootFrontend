export interface CommentPayload {
        commentId?: number;
        postId: number;
        text?: string
        repliedTo?: number;
        username?:string;
        duration?: string;
        childComments?: Array<CommentPayload>;
}       

