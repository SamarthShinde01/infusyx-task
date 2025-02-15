"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
	id: number;
	title: string;
	body: string;
}

export default function PostsPage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [newPost, setNewPost] = useState({ title: "", body: "" });
	const [editingPost, setEditingPost] = useState<Post | null>(null);

	// Fetch posts
	useEffect(() => {
		axios
			.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
			.then((response) => {
				setPosts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setLoading(false);
			});
	}, []);

	// Handle Create Post
	const createPost = () => {
		axios
			.post<Post>("https://jsonplaceholder.typicode.com/posts", newPost)
			.then((response) => {
				setPosts([response.data, ...posts]); // Add new post to list
				setNewPost({ title: "", body: "" }); // Reset input fields
			})
			.catch((error) => console.error("Error creating post:", error));
	};

	// Handle Update Post
	const updatePost = (id: number) => {
		if (!editingPost) return;

		axios
			.put<Post>(
				`https://jsonplaceholder.typicode.com/posts/${id}`,
				editingPost
			)
			.then((response) => {
				setPosts(posts.map((post) => (post.id === id ? response.data : post)));
				setEditingPost(null); // Reset editing state
			})
			.catch((error) => console.error("Error updating post:", error));
	};

	// Handle Delete Post
	const deletePost = (id: number) => {
		axios
			.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then(() => {
				setPosts(posts.filter((post) => post.id !== id));
			})
			.catch((error) => console.error("Error deleting post:", error));
	};

	if (loading) {
		return <div className="p-4">Loading...</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Posts</h1>

			{/* Create Post */}
			<div className="mb-4 p-4 border rounded-lg">
				<h2 className="text-lg font-semibold mb-2">Create Post</h2>
				<input
					type="text"
					placeholder="Title"
					value={newPost.title}
					onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
					className="w-full p-2 border rounded mb-2"
				/>
				<textarea
					placeholder="Body"
					value={newPost.body}
					onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
					className="w-full p-2 border rounded mb-2"
				/>
				<button
					onClick={createPost}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Add Post
				</button>
			</div>

			<ul>
				{posts.map((post) => (
					<li key={post.id} className="mb-4 p-4 border rounded-lg">
						{editingPost?.id === post.id ? (
							// Edit Mode
							<div>
								<input
									type="text"
									value={editingPost.title}
									onChange={(e) =>
										setEditingPost({ ...editingPost, title: e.target.value })
									}
									className="w-full p-2 border rounded mb-2"
								/>
								<textarea
									value={editingPost.body}
									onChange={(e) =>
										setEditingPost({ ...editingPost, body: e.target.value })
									}
									className="w-full p-2 border rounded mb-2"
								/>
								<button
									onClick={() => updatePost(post.id)}
									className="bg-green-500 text-white px-4 py-2 rounded mr-2"
								>
									Save
								</button>
								<button
									onClick={() => setEditingPost(null)}
									className="bg-gray-500 text-white px-4 py-2 rounded"
								>
									Cancel
								</button>
							</div>
						) : (
							// View Mode
							<div>
								<h2 className="text-xl font-semibold">{post.title}</h2>
								<p className="text-gray-700">{post.body}</p>
								<button
									onClick={() => setEditingPost(post)}
									className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
								>
									Edit
								</button>
								<button
									onClick={() => deletePost(post.id)}
									className="bg-red-500 text-white px-4 py-2 rounded"
								>
									Delete
								</button>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
