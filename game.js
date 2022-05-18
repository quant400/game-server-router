const express = require('express')
const app = express()
const path = require('path')
// const router = express.Router();
const buildPath = __dirname + '/game-deployment-builds/'

app.get('/',function(req,res){
  res.send("Staging server is running...")
});

app.get('/chicken-run',function(req,res){
  res.sendFile(path.join(buildPath + 'chicken-run/WebGL Builds/index.html'));
});

app.get('/fight-the-bear',function(req,res){
  res.sendFile(path.join(buildPath + 'fight-the-bear/WebGL Builds/index.html'));
});

app.use(express.static('game-deployment-builds/chicken-run/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))

app.use(express.static('game-deployment-builds/fight-the-bear/WebGL Builds', {
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
app.listen(process.env.port || 3000);

console.log('Running at Port 3000...');
