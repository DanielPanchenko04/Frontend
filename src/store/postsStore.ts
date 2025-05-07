// src/store/postsStore.ts
import { create } from 'zustand';
import {useUserStore} from "./usersStore.ts";
import {
    getAllPosts,
    createPost as apiCreatePost,
    updatePost as apiUpdatePost,
    deletePost as apiDeletePost,
    type Post,
} from '../api/mockApi';


type PostsState = {
    posts: Array<Post>;
    fetchPosts: () => Promise<void>;
    addPost: (post: Omit<Post, 'id'>) => Promise<void>;
    updatePost: (post: Post) => Promise<void>;
    removePost: (id: number) => Promise<void>;
};

export const usePostsStore = create<PostsState>((set) => ({
    posts: [],

	fetchPosts: async () => {
		const posts = await getAllPosts();
		const userId = useUserStore.getState().userId;
		if (userId === null) return;

		const userPosts = posts.filter(post => post.user?.id === userId);
		set({ posts: userPosts });


	},

	addPost: async (data) => {
		const userId = useUserStore.getState().userId;
		if (!userId) return;

		const newPost = await apiCreatePost({...data, published:true, userId }); // ← додаємо userId до тіла запиту
		if (!newPost) return;

		set((state) => ({ posts: [...state.posts, newPost] }));
	},

    updatePost: async (post) => {
        const updated = await apiUpdatePost(post.id, post);
        if (updated) {
            set((state) => ({
                posts: state.posts.map((p) => (p.id === post.id ? updated : p)),
            }));
        }
    },

    removePost: async (id) => {
        const deleted = await apiDeletePost(id);
        if (deleted) {
            set((state) => ({
                posts: state.posts.filter((post) => post.id !== id),
            }));
        }
    },
}));
