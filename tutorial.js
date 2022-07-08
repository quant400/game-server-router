const express = require('express')
const app = express()
const path = require('path')
const buildPath = __dirname + '/game-deployment-builds/'

app.get('/',function(req,res){
  res.sendFile(path.join(buildPath + 'tutorial/WebGL Builds/index.html'))
});

app.use(express.static('game-deployment-builds/tutorial/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))

// app.use('/', router);
app.listen(process.env.port || 3001);

console.log('Running at Port 3001...');
