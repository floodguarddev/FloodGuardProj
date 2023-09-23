const { addScheduledNews } = require('../services/news.services');

const CronJob = require('cron').CronJob;

const newsCronPattern = '00 00 * * *'; 

const newsJob = new CronJob(newsCronPattern, ()=>{
    console.log('here');
    addScheduledNews().then((results)=>{
        console.log(`Added ${results.length} scheduled news`);
    })
}, null, true, 'UTC')//As News API works on UTC 00 so end of the day must be in UTC 00//

module.exports = {newsJob}