import { pgTable, varchar, boolean, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schemas";

export const books = pgTable("books", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: varchar("title", { length: 128 }).notNull(),
	description: text("description"),
	imageUrl: text("image_url"),
	available: boolean("available").default(true).notNull(),
	checkedOutBy: text("checked_out_by").references(() => user.id, {
		onDelete: "set null",
	}),
});

export type BookType = typeof books.$inferSelect;
