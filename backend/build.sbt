import play.Play.autoImport._

import PlayKeys._

name := "rolling_forecast"

version := "0.1.0"

scalaVersion := "2.11.2"

resolvers += "Sonatype Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"

libraryDependencies ++= Seq(
  "org.reactivemongo" %% "play2-reactivemongo" % "0.11.0-SNAPSHOT"
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)