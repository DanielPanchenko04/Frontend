import { usePostsStore } from '../store/postsStore';
import { useUserStore } from '../store/usersStore.ts';
import { Link, Outlet, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';


const Posts = () => {
	const posts = usePostsStore((state) => state.posts);
	const fetchPosts = usePostsStore((state) => state.fetchPosts);
	const removePost = usePostsStore((state) => state.removePost);
	const logout = useUserStore((state) => state.logout);
	const router = useRouter();

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handleLogout = () => {
		logout();
		router.navigate({ to: '/login' });
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-6 text-gray-800">Список постів</h1>

			<div className="space-y-4">
				{posts.map((post) => (
					<div key={post.id} className="p-4 border rounded-lg shadow space-y-2">
						<p><strong>ID:</strong> {post.id}</p>
						<p><strong>Заголовок:</strong> {post.title}</p>
						<div className="flex items-center gap-4">
							<Link to={`/posts/${post.id}`} className="text-blue-600 hover:underline">
								Переглянути деталі
							</Link>
							<button
								onClick={() => {
									const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цей пост?');
									if (confirmDelete) {
										removePost(post.id);
									}
								}}
								className="text-red-600 hover:underline"
							>
								Видалити
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 flex gap-4">
				<Link
					to="/posts/new"
					className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
				>
					Новий пост
				</Link>

				<button
					onClick={handleLogout}
					className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
				>
					Вийти
				</button>
			</div>




			<Outlet />
		</div>
	);
};

export default Posts;
