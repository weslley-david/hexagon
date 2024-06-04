-- CreateEnum
CREATE TYPE "gender_choices" AS ENUM ('masculino', 'feminino', 'outro');

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "avaliation" INTEGER NOT NULL,
    "question" INTEGER NOT NULL,
    "item" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliation" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "notes" VARCHAR(255),
    "client" INTEGER NOT NULL,
    "specialist" INTEGER NOT NULL,
    "test" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avaliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "identifier" VARCHAR(30) NOT NULL,
    "name" VARCHAR(100),
    "bio" VARCHAR(100),
    "imageurl" VARCHAR(100),
    "birthdate" DATE,
    "code" VARCHAR(7),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "gender" "gender_choices",

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_guardian" (
    "id" SERIAL NOT NULL,
    "client" INTEGER NOT NULL,
    "guardian" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_specialist" (
    "id" SERIAL NOT NULL,
    "client" INTEGER NOT NULL,
    "specialist" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "council" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "council_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardian" (
    "id" SERIAL NOT NULL,
    "identifier" VARCHAR(30) NOT NULL,
    "name" VARCHAR(100),
    "bio" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR NOT NULL,
    "imageurl" VARCHAR,
    "birthdate" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "number" INTEGER NOT NULL,
    "score" DECIMAL(3,2),
    "question" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "number" INTEGER NOT NULL,
    "test" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "area" TEXT,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_domain" (
    "id" SERIAL NOT NULL,
    "domain" INTEGER NOT NULL,
    "question" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_sugestion" (
    "id" SERIAL NOT NULL,
    "avaliation" INTEGER NOT NULL,
    "question" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_sugestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialist" (
    "id" SERIAL NOT NULL,
    "identifier" VARCHAR(30) NOT NULL,
    "name" VARCHAR(100),
    "bio" VARCHAR(100),
    "crm" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR NOT NULL,
    "imageurl" VARCHAR,
    "birthdate" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "specialty" TEXT,

    CONSTRAINT "specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialist_council" (
    "id" SERIAL NOT NULL,
    "specialist" INTEGER NOT NULL,
    "council" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialist_council_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialist_specialty" (
    "id" SERIAL NOT NULL,
    "specialist" INTEGER NOT NULL,
    "specialty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialist_specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialty" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "imageurl" VARCHAR,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_identifier_key" ON "client"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "guardian_identifier_key" ON "guardian"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "guardian_email_key" ON "guardian"("email");

-- CreateIndex
CREATE UNIQUE INDEX "specialist_identifier_key" ON "specialist"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "specialist_email_key" ON "specialist"("email");

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_avaliation_fkey" FOREIGN KEY ("avaliation") REFERENCES "avaliation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_item_fkey" FOREIGN KEY ("item") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_fkey" FOREIGN KEY ("question") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliation" ADD CONSTRAINT "avaliation_client_fkey" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliation" ADD CONSTRAINT "avaliation_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "specialist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliation" ADD CONSTRAINT "avaliation_test_fkey" FOREIGN KEY ("test") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_guardian" ADD CONSTRAINT "client_guardian_client_fkey" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_guardian" ADD CONSTRAINT "client_guardian_guardian_fkey" FOREIGN KEY ("guardian") REFERENCES "guardian"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_specialist" ADD CONSTRAINT "client_specialist_client_fkey" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_specialist" ADD CONSTRAINT "client_specialist_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_question_fkey" FOREIGN KEY ("question") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_test_fkey" FOREIGN KEY ("test") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_domain" ADD CONSTRAINT "question_domain_domain_fkey" FOREIGN KEY ("domain") REFERENCES "domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_domain" ADD CONSTRAINT "question_domain_question_fkey" FOREIGN KEY ("question") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_sugestion" ADD CONSTRAINT "question_sugestion_avaliation_fkey" FOREIGN KEY ("avaliation") REFERENCES "avaliation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_sugestion" ADD CONSTRAINT "question_sugestion_question_fkey" FOREIGN KEY ("question") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specialist_council" ADD CONSTRAINT "specialist_council_council_fkey" FOREIGN KEY ("council") REFERENCES "council"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specialist_council" ADD CONSTRAINT "specialist_council_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specialist_specialty" ADD CONSTRAINT "specialist_specialty_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specialist_specialty" ADD CONSTRAINT "specialist_specialty_specialty_fkey" FOREIGN KEY ("specialty") REFERENCES "specialty"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

