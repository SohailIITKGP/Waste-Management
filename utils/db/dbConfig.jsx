import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://Zero2Hero_owner:npg_okDY5NsHi8jI@ep-solitary-paper-a8lvpvyh-pooler.eastus2.azure.neon.tech/Zero2Hero?sslmode=require"
);
export const db = drizzle(sql, { schema });
