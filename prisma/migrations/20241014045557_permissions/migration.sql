-- CreateTable
CREATE TABLE "Permission" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" INT4 NOT NULL,
    "scope" STRING NOT NULL,
    "role" STRING NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);
