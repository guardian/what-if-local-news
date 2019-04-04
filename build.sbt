name := "localnews"
organization := "com.gu"

version := "1.0-SNAPSHOT"

scalaVersion := "2.12.8"

lazy val root = (project in file("."))
  .aggregate(common, frontend, cli)

lazy val common = (project in file("common"))
  .settings(
    name := "common",
    libraryDependencies ++= Seq(
      "com.sksamuel.elastic4s" %% "elastic4s-http" % "6.3.7",
      "org.elasticsearch.client" % "elasticsearch-rest-client-sniffer" % "6.4.2",
    )
  )

lazy val frontend = (project in file("frontend"))
  .enablePlugins(PlayScala)
  .dependsOn(common)
  .settings(
    name := "localnews",

    libraryDependencies ++= Seq(
      ws,
      "com.pauldijou" %% "jwt-play" % "0.18.0",
      "com.beachape" %% "enumeratum-play" % "1.5.14",
      "com.iheart" %% "ficus" % "1.4.4"
    ),

    javaOptions in Universal ++= Seq(
      "-Dpidfile.path=/dev/null",
      "-J-XX:MaxRAMFraction=2",
      "-J-XX:InitialRAMFraction=2",
      "-J-XX:MaxMetaspaceSize=500m",
      "-J-XX:+UseConcMarkSweepGC",
      "-J-XX:+PrintGCDetails",
      "-J-XX:+PrintGCDateStamps",
      "-J-XX:+HeapDumpOnOutOfMemoryError"
    )
  )

lazy val cli = (project in file("cli"))
  .dependsOn(common)
  .enablePlugins(JavaAppPackaging)
  .settings(
    name := "cli",
    libraryDependencies ++= Seq(
      "org.rogach" %% "scallop" % "3.1.3",
      "com.github.tototoshi" %% "scala-csv" % "1.3.5",
      "com.beachape" %% "enumeratum-play" % "1.5.14",
      "org.apache.tika" % "tika-parsers" % "1.18" exclude("org.slf4j", "slf4j-jdk14"),
    ),
    fork in run := true,
    connectInput in run := true
  )