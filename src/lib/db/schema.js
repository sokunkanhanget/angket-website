import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  scamType: text("scam_type").notNull(),
  description: text("description").notNull(),
  platform: text("platform"),
  scammerContact: text("scammer_contact"),
  amountLost: text("amount_lost"),
  reporterName: text("reporter_name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
