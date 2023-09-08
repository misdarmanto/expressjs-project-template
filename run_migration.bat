@echo off

echo "----- Migration: Started -----"
npx sequelize-cli db:migrate
echo "----- Migration: Finished -----"

echo "----- Seed: Started -----"
npx sequelize-cli db:seed:all
echo "----- Seed: Finished -----"

exit