// src/pages/CreatePost.tsx
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePostsStore } from '../store/postsStore';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const addPost = usePostsStore((state) => state.addPost);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addPost({ title, content });
        navigate({ to: '/posts' });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Створити новий пост</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Заголовок</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Зміст</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 h-32"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Створити
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
