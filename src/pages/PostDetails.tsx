import { useParams, useNavigate } from '@tanstack/react-router';
import type {FC} from 'react';
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect} from 'react';
import {usePostsStore} from "../store/postsStore.ts";



const PostDetails: FC = () => {
    const { id } = useParams({ from: '/posts/$id' });
    const navigate = useNavigate();

    const posts = usePostsStore((state) => state.posts);
    const post = posts.find((p) => p.id === Number(id));


	const updatePost = usePostsStore((state) => state.updatePost);
    const fetchPosts = usePostsStore((state) => state.fetchPosts);

    const [title, setTitle] = useState(post?.title ?? '');
    const [content, setContent] = useState(post?.content ?? '')

    useEffect(() => {
        if (!post) fetchPosts();
    }, []);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    if (!post) {
        return (
            <div className="p-6 max-w-3xl mx-auto text-center">
                <h1 className="text-xl text-gray-600">Пост не знайдено</h1>
            </div>
        );
    }
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await updatePost({ id: post.id, title, content });
        navigate({ to: '/posts' });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h1>
            <div className="text-sm text-gray-600 mb-2">
                <strong>ID:</strong> {post.id}
            </div>
            <div className="text-lg text-gray-800">
                <strong>Зміст:</strong>
                <p className="mt-2">{post.content}</p>
            </div>

            <hr className="border-t-2 border-black" />

            <div>
                <h1 className="text-2xl font-bold mb-6 text-gray-800 mt-4">Оновити пост</h1>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Новий заголовок</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Новий зміст</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2 h-32"
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                            Зберегти зміни
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default PostDetails;
