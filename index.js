const cron = require('node-cron')
const influx = require('influx')
const { exec } = require('child_process')

const DB = new influx.InfluxDB({
  host: '192.168.0.111',
  port: 8086,
  protocol: 'http',
  username: 'root',
  password: 'root',
  database: 'grafana'
})
const flag = 3000

cron.schedule('*/1 * * * *', function(){
  DB.query(`select count(*) from real_test where dst_port = '15000' and time > now() -1m`)
	.then(result => {
	if(result[0]) {
	console.log("1500:" + result[0].count_contents);
	const alias = result[0].count_contents / flag
	if(alias < 1) {
	exec('docker service scale prod_java=1', (err, stdout, stderr) => {
  		if (err) {
    		  console.error(err);
    		  return;
  		}
  		console.log(stdout);
	    });
	  } else {
  	    exec('docker service scale prod_java=2', (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(stdout);
            });
	
  	    }
	}
	})

  DB.query(`select count(*) from real_test where dst_port = '16000' and time > now() -1m`)
        .then(result => {
	if(result[0]) {
        console.log("1600:" + result[0].count_contents);
	const alias = result[0].count_contents / flag
        if(alias < 1) {
        exec('docker service scale prod_db=1', (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(stdout);
            });
          } else {
            exec('docker service scale prod_db=2', (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(stdout);
            });

            }
	}
        })

  DB.query(`select count(*) from real_test where dst_port = '17000' and time > now() -1m`)
        .then(result => {
	if(result[0]){
        console.log("1700:" + result[0].count_contents);
	const alias = result[0].count_contents / flag
        if(alias < 1) {
        exec('docker service scale prod_python=1', (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(stdout);
            });
          } else {
            exec('docker service scale prod_python=2', (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(stdout);
            });

            }
	}
        })




  
  console.log('1분마다 실행되는 작업');
});
