const cron = require('node-cron')
const influx = require('influx')

const DB = new influx.InfluxDB({
  host: '192.168.0.111',
  port: 8086,
  protocol: 'http',
  username: 'root',
  password: 'root',
  database: 'grafana'
})

cron.schedule('*/1 * * * *', function(){
  console.log('1분마다 실행되는 작업');
});
