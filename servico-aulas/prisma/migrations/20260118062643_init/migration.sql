-- CreateTable
CREATE TABLE "lessons" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "live_sessions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "live_sessions_pkey" PRIMARY KEY ("id")
);
