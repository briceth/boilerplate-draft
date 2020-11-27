#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER bricetessierhuort;
    CREATE DATABASE boilerplate_test;
    GRANT ALL PRIVILEGES ON DATABASE boilerplate_test TO bricetessierhuort;
EOSQL