CREATE TABLE IF NOT EXISTS "Movie" (
    "Id" SERIAL CONSTRAINT "PK_Movie" PRIMARY KEY,
    "Title" TEXT NULL,
    "ReleaseDate" TEXT NOT NULL,
    "Genre" TEXT NULL,
    "Price" TEXT NOT NULL
);
INSERT INTO "Movie" VALUES(1,'pocahontas','2020-07-07 00:00:00','drama','50.0');
