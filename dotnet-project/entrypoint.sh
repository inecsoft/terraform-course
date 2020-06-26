#! /bin/bash

set -e 

until dotnet ef database update; do
>&2 echo "Postgres Server is starting up"
sleep 1
done