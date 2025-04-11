import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { books } from "../src/db/schemas";

async function main() {
	console.log("establishing connection to database...");
	const db = drizzle(process.env.DATABASE_URL as string);

	console.log("seeding database...");

	const booksData = [
		{
			title: "The Great Gatsby",
			description:
				"The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
			imageUrl:
				"https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
		},
		{
			title: "To Kill a Mockingbird",
			description:
				"To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.",
			imageUrl:
				"https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
		},
		{
			title: "1984",
			description:
				"1984 is a dystopian novel by George Orwell published in 1949. The novel is set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation.",
			imageUrl:
				"https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
		},
	];

	await db.insert(books).values(booksData);
	console.log("Books seeded successfully!");
}

main();
