-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "FirstName" TEXT,
    "LastName" TEXT,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
