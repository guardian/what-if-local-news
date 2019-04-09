# Local News Discovery - backend 

## To run 

You need to have installed Docker and Docker-Compose. 
The desktop download for Mac provides both of these.
Get docker up: `docker-compose up`

This will spin up an instance of ElasticSearch in a local Docker. 


To insert a file into the ES instance, you need to use the `cli`.

1. Get into sbt: `sbt`
2. Open the cli project: `project cli`
3. Run the command: 
For eg:
`run --type <file-type> <file-path>`


### Other docker commands

Take docker down: `docker-compose down`

Take docker down and delete volume: `docker-compose down -v`

