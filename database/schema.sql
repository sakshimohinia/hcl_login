-- Optional: the backend creates this automatically (ddl-auto=update).
-- Run manually only if you want to set it up yourself.

CREATE DATABASE IF NOT EXISTS authdb;
USE authdb;

CREATE TABLE IF NOT EXISTS users (
  id       BIGINT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(255),
  email    VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL   -- stores the BCrypt hash, not plain text
);

-- Check data after signing up:
-- SELECT id, name, email FROM users;
