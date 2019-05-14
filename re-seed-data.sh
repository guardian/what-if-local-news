#!/bin/bash
docker-compose down -v
docker-compose up -d
sleep 10 # wait for ES
sbt "project cli" \
"run --type CouncilContracts ../seed/LOCAL_NEWS_K_C/contracts/kandc-contracts-construction.csv" \
"run --type CouncilContracts ../seed/LOCAL_NEWS_K_C/contracts/kandc-contracts-services.csv" \
"run --type PlanningApplications ../seed/LOCAL_NEWS_K_C/planning-applications/kandc-planning-applications.csv" \
"run --type CouncilPetitions ../seed/LOCAL_NEWS_K_C/council-petitions/petitions3.csv"