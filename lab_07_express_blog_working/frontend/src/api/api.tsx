import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Post, Category, Comment } from './interfaces';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await api.get('/post');
    return data;
};

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
};

export const fetchPostById = async (id: number): Promise<Post> => {
    const { data } = await api.get(`/post/${id}`);
    return data;
};

export const usePost = (id: number) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostById(id),
        enabled: !!id,
    });
};

export const fetchCategories = async (): Promise<Category[]> => {
    const { data } = await api.get('/category');
    return data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
    const { data } = await api.get(`/category/${id}`);
    return data;
};

export const useCategory = (id: number) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => fetchCategoryById(id),
        enabled: !!id,
    });
};

export const fetchCommentsByPostId = async (
    postId: number
): Promise<Comment[]> => {
    const { data } = await api.get(`/comment?postId=${postId}`);
    return data;
};

export const useComments = (postId: number) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchCommentsByPostId(postId),
        enabled: !!postId,
    });
};

export const createComment = async (
    newComment: Omit<Comment, 'id' | 'createdAt'>
) => {
    const { data } = await api.post('/comment', newComment);
    return data;
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['comments', variables.postId],
            });
        },
    });
};
