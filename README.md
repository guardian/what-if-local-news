# Local News Discovery - backend 

## To run 

You need to have installed Docker and Docker-Compose. 
The desktop download for Mac provides both of these.
Get docker up: `docker-compose up`

This will spin up an instance of ElasticSearch in a local Docker. 

In another tab fire up the scala app: 
`sbt` > `project frontend` > `run`

In another tab run the react app:
In the `client` folder run `yarn start` to kickstart the React build 

## To add a file with the cli

To insert a file into the ES instance, you need to use the `cli`.

1. Get into sbt: `sbt`
2. Open the cli project: `project cli`
3. Run the command: `run --type <file-type> <relative-file-path>`
For eg: `run --type councilContracts ../../../Documents/local_news_kandc/contracts/kandc-contracts-services.csv`

Acceptable file types are: `councilContracts`, `councilPetitions`, `planningApplications`.

As a convenience for people that have the original seed data you can also drop the seed data into a `seed` folder in the root and then run. `./re-seed-data.sh`.

To view the inserted results navigate to the hardcoded localhost port: `http://127.0.0.1:9200/`
And look at the index you have just created: `http://127.0.0.1:9200/council-contracts/_search?q=*`

## To add a new type of file

New types of file need to have new data parsing models associated with them. These are found in the `cli` directory under `parsers`.  


### Other docker commands

Take docker down: `docker-compose down`

Take docker down and delete volume: `docker-compose down -v`

