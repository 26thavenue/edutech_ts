-- CreateIndex
CREATE INDEX `Subscription_expires_subscribed_idx` ON `Subscription`(`expires`, `subscribed`);
