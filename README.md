# Local News Discovery - backend 

## To run 

You need to have installed Docker and Docker-Compose. 
The desktop download for Mac provides both of these.
Get docker up: `docker-compose up`

This will spin up an instance of ElasticSearch in a local Docker. 


To insert a file into the ES instance, you need to use the `cli`.

1. Get into sbt: `sbt`
2. Open the cli project: `project cli`
3. Run the command: `run --type <file-type> <relative-file-path>`
For eg: `run --type councilContracts ../../Documents/local_news_kandc/contracts/kandc-contracts-services.csv`

Acceptable file types are: `councilContracts`, `councilPetitions`, `planningApplications`.

To view the inserted results navigate to the hardcoded localhost port: `http://127.0.0.1:9200/`
And look at the index you have just created: `http://127.0.0.1:9200/council-contracts/_search?q=*`

### Other docker commands

Take docker down: `docker-compose down`

Take docker down and delete volume: `docker-compose down -v`

