export interface Comment {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    postId: number;
}

export interface Category {
    id: number;
    title: string;
    description?: string;
}

export interface Post {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    content?: string;
    published: boolean;
    categoryId: number;
}
