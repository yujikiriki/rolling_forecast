[![Stories in Ready](https://badge.waffle.io/yujikiriki/rolling_forecast.png?label=ready&title=Ready)](http://waffle.io/yujikiriki/rolling_forecast)

# Rolling forecast

* Angular.js & Play framework dummy project

## Develop

* On the ```backend``` folder, run sbt and enter the command: ```run -Dhttp.port=9100```
* On the ```webapp``` folder, run ```grunt serve```
* ```backend``` and ```webapp``` applications runs behind an ```haproxy``` instance.
* To start ```mongodb``` instance run command ```~/dev/mongo/bin/mongod --dbpath ~/dev/mongo/data```
* ssh -i my_key.pem ubuntu@rollingforecast

# Deploy
* Under ```backend``` folder run sbt and enter the command: ```dist```
* Under the ```webapp``` folder run ```grunt build```

