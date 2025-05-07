import api from "./axios.ts";


export interface Post {
    id: number;
    title: string;
    content: string;
		user?: {
			id: number;
		};
}

export type CreatePostInput = {
	title: string;
	content: string;
	published: boolean;
	userId: number;
};

// export interface User {
// 	id: number;
// 	name: string;
// 	email: string;
// 	password: string;
// 	avatar: string;
// }

export const getAllPosts = async (): Promise<Array<Post>> => {
    const response = await api.get<{message: string; data: Array<Post>}>("/posts")
    return response.data.data;
};


export const getPostById = async (id: number): Promise<Post | undefined> => {
    const response = await api.get<{ message: string; data: Post }>(`/posts/${id}`);
    return response.data.data;
};


export const createPost = async (newPost: CreatePostInput): Promise<Post | undefined> => {
    const response = await api.post<{ message: string; data: Post }>("/posts", newPost);
    return response.data.data;
};


export const updatePost = async (id: number, data: Omit<Post, 'id'>): Promise<Post | undefined> => {
    const response = await api.patch<{ message: string; data: Post }>(`/posts/${id}`, data);
		return response.data.data;
};


export const deletePost = async (id: number): Promise<boolean> => {

    await api.delete<{message: string;}>(`/posts/${id}`);
    return true;
};


export const loginUser = async (user: { email: string; password: string }) => {
	const response = await api.post<{ message: string; data: { token: string; userId: number } }>('/auth/login', user);
	const token = response.data.data.token;
	const userId = response.data.data.userId;
	localStorage.setItem('token', token);
	return { token, userId };
};


