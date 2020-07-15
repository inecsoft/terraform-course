CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

CREATE TABLE "Movie" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Movie" PRIMARY KEY,
    "Title" TEXT NULL,
    "ReleaseDate" TEXT NOT NULL,
    "Genre" TEXT NULL,
    "Price" TEXT NOT NULL
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20200709205137_final', '3.1.5');

