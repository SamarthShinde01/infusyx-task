import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold mb-6">CRUD App</h1>
			<nav className="space-x-4">
				<Link href="/posts">
					<Button variant="outline">Manage Posts</Button>
				</Link>
				<Link href="/users">
					<Button variant="outline">View Users</Button>
				</Link>
			</nav>
		</div>
	);
}
