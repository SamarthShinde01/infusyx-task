"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface User {
	id: number;
	name: string;
	email: string;
	username: string;
	address: { city: string };
}

export default function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get<User[]>("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				setUsers(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div className="p-4">Loading...</div>;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Users</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Username</TableHead>
						<TableHead>City</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.address.city}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
