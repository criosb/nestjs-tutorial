-- Create dabatase if don't exists
SELECT 'CREATE DATABASE carlosdb' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'carlosdb')\gexec