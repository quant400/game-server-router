const express = require('express')
const app = express()
const path = require('path')
const buildPath = __dirname + '/beta-builds/'


app.get('/',function(req,res){
  res.sendFile(path.join(buildPath + 'WebGL Builds/index.html'))
});

app.use(express.static('beta-builds/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz") || path.endsWith(".unityweb")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))

app.get('/ping',function(req,res){
  res.send('server is running...')
});

app.listen(process.env.port || 3001);

console.log('Running at Port 3001...');
