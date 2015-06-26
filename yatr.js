#!/usr/bin/env node

// The MIT License (MIT)

// Copyright (c) 2015 LestaD (Sergey Sova) <i.am@lestad.net>

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var options = {
  host: 'translate.yandex.net',
  path: '/api/v1.5/tr.json/translate?key=trnsl.1.1.20150402T173446Z.82a90fe78ca2aeaf.a3bd7c7a0f72b260e28f5d92e4f242cf6ba189d3&lang=%l&text=%t',
  port: 443,
  method: 'GET'
};

var iter = 0;

function translate(c, l) {
  iter++;
  if (iter > 2) {
    console.error('Error: Recursion!');
    process.exit(0);
  }

  var loc = options.path.replace('%t', encodeURIComponent(c)).replace('%l', l);

  var req = https.request({
    host: options.host,
    path: loc,
    post: options.port,
    method: options.method
  }, function(res){

    if (res.statusCode >= 200 && res.statusCode < 300) {
      var result = '';
      res.on('data', function(d){
        result += d;
      });
      res.on('end', function(){
        var js = JSON.parse(result);

        if (js.text[0] == c) {
          return translate(c, 'ru');
        }
        console.log(js.text[0]);
        process.exit(0);
      });
    }
    else {
      console.error('Error: can\'t translate it!');
      process.exit(1);
    }
  });
  req.end();
}

var list = process.argv.splice(2);
var word = list.join(' ');

if (word.length === 0) {
  // Read from pipe
  var string = ''
  process.stdin.on('data', function(chunk){
    total += chunk;
  });
  process.stdin.on('end', function(){
    translate(total, 'en');
  });
}
else {
  translate(word, 'en');
}

