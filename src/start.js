import {connect as connectToIdb} from './helpers/idb.js';
import {app} from './server.js';
connectToIdb((err)=>{
  if (err) {
    console.error(err);
    process.exit(1);
  }
  app.listen(8080, ()=>{
    // fetchImagesJob.start();
    // fetchImages({radius: 500});
    console.log('Server started');
    console.log('=========================================================');
  });
});
