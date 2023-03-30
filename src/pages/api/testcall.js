// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var Kafka = require('node-rdkafka');
var readline = require('readline');
import env from 'process'
import fs  from 'fs';
import { render } from 'react-dom';

export default function handler(
 req,
 res
) {
     
  console.log(process.env.BOOTSTRAP_SERVERS)
  let consumedMessages = new Array();
  let newString = '';

  function readAllLines(path) {    
    return new Promise((resolve, reject) => {
      // Test file access directly, so that we can fail fast.
      // Otherwise, an ENOENT is thrown in the global scope by the readline internals.
      try {
        fs.accessSync(path, fs.constants.R_OK);
      } catch (err) {
        reject(err);
      }
      
      let lines = [];
      
      const reader = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
      });
      
      reader
        .on('line', (line) => lines.push(line))
        .on('close', () => resolve(lines));
    });
  }
  
   async function configFromPath(path) {
    const lines = await readAllLines(path);
  
    return lines
      .filter((line) => !/^\s*?#/.test(line))
      .map((line) => line
        .split('=')
        .map((s) => s.trim()))
      .reduce((config, [k, v]) => {
        config[k] = v;
        return config;
      }, {});
    }

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

let uniqueGroupId = create_UUID();
function createConsumer(config, onData) {
  console.log(process.env.BOOTSTRAP_SERVERS)
  const consumer = new Kafka.KafkaConsumer(
      {
      'metadata.broker.list': process.env.BOOTSTRAP_SERVERS,
      'sasl.username': process.env.SASL_USERNAME,
      'sasl.password': process.env.SASL_PASSWORD,
      'security.protocol': process.env.SECURITY_PROTOCAL,
      'sasl.mechanisms': process.env.SASL_MECHANISMS,
      'enable.ssl.certificate.verification': "false",
      'group.id': `${uniqueGroupId}`,
      'client.id': 'rdkafka',
      },{'auto.offset.reset': 'earliest'});
      return consumer;
};

/**
 * consumerExample function used to run the common function for the consumer 
 */
  if (process.argv.length < 3) {
    console.log("Please provide the configuration file path as the command line argument");
    process.exit(1);
  }

  let topic = "topic_0";

    const consumer = createConsumer();
    //logging debug messages, if debug is enabled
    consumer.on('event.log', function(log) {
      console.log(log);
    });

    //logging all errors
    consumer.on('event.error', function(err) {
      console.error('Error from consumer');
      console.error(err);
    });

    let topicList = [];
    
    //starting the consumer
    consumer.connect({}, function(err, d) {
      console.log('error', err);
       console.log('connected consumer', d);
      topicList = d.topics
      
    });
    
    process.on('SIGINT', () => {
        console.log('\nDisconnecting consumer...');
        consumer.disconnect();
    });

    let newDataRendered = [];
    let numMessages = 10;

   function cb(err,message ){
     if(newDataRendered.length !== numMessages){
      newDataRendered.push(message.value.toString());
     }else if(newDataRendered.length === numMessages){
       res.status(200).json({ data: newDataRendered, topics: topicList})
       consumer.disconnect();
     }
  }
 
consumer.on('ready', function() {
  consumer.subscribe([topic]);
  
  // Consume from the purchases topic. This is what determines
  // the mode we are running in. By not specifying a callback (or specifying
  // only a callback) we get messages as soon as they are available.
  consumer.consume(cb);
}).on('data', function(data) {
  
})

}
