-- AlterSequence
ALTER SEQUENCE "Match_matchId_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "maxRank" INT4;
ALTER TABLE "Tournament" ADD COLUMN     "minRank" INT4;
ALTER TABLE "Tournament" ADD COLUMN     "usesBWS" BOOL;
