-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code_bar" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
