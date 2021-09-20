export interface CommentPayload {
        postId: number;
        text: string;
        username?:string;
        duration?: string;
        childComments: Array<CommentPayload>;
}       

