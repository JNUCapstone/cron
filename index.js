var cron = require('node-cron')

cron.schedule('*/1 * * * *', function(){
  console.log('1분마다 실행되는 작업');
});
