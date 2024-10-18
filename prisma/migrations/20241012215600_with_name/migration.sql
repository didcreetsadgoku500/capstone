-- CreateTable
CREATE TABLE "Tournament" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);
