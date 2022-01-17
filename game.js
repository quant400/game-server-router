const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/builds/minigame-chicken-run/WebGL Builds/index.html'));
});

app.use(express.static('builds/minigame-chicken-run/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000...');
