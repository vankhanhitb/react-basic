import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import { PrismaClient, Role } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const email = process.env.SEED_USER_EMAIL ?? "admin@example.com";
  const password = process.env.SEED_USER_PASSWORD ?? "Practice123!";
  const passwordHash = await hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: "Practice Admin", passwordHash, role: Role.ADMIN },
    create: {
      email,
      name: "Practice Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const product = await prisma.product.upsert({
    where: { slug: "everyday-canvas-tote" },
    update: {},
    create: {
      name: "Everyday Canvas Tote",
      slug: "everyday-canvas-tote",
      description: "A seeded product used to explore the complete data flow.",
      basePriceCents: 3200,
      inventory: 48,
      ownerId: user.id,
      tiers: {
        create: [
          { minQuantity: 2, discountPercent: 10 },
          { minQuantity: 4, discountPercent: 15 },
          { minQuantity: 8, discountPercent: 20 },
        ],
      },
    },
  });

  console.log(`Seed complete: ${user.email} / ${product.name}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
