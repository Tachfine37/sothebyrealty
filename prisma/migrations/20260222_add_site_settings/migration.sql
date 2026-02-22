-- Migration: Create SiteSettings table for WhatsApp configuration
CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" TEXT NOT NULL DEFAULT 'singleton',
  "whatsappEnabled" BOOLEAN NOT NULL DEFAULT false,
  "whatsappNumber" TEXT NOT NULL DEFAULT '',
  "whatsappMessage" TEXT NOT NULL DEFAULT '',
  "whatsappPosition" TEXT NOT NULL DEFAULT 'right',
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- Ensure the singleton row exists
INSERT INTO "SiteSettings" ("id", "whatsappEnabled", "whatsappNumber", "whatsappMessage", "whatsappPosition", "updatedAt")
VALUES ('singleton', false, '', '', 'right', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
