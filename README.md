# Express Live coding 

### Setup

Using express generator to get things going fast, based on express docs [Getting started](http://expressjs.com/en/starter/generator.html).

Global install express generator:
```
npm install express-generator -g
```
Run it with the flags:
```
express express-app --ejs --css less --git
```

### Setup

#### Middleware
```
npm install --save helmet compression
```
- helmet - security middleware
- compression - gzip middleware

#### Client js build
ES2015 + react compiled dynamically.
```
npm install --save browserify-middleware babelify babel-preset-es2015 babel-preset-react
```
#### nodemon
For server reloading on source code changes.
```
npm install --save-dev nodemon
```
Add script:
```
"dev": "nodemon --watch ./ --ignore ./public ./bin/www"
```

### Routing
Persistent JS based db 
```
npm install nedb --save
```

### User autorization
```
npm install --save passport passport-github2 method-override express-partials express-session
```
Based on [link](https://github.com/cfsghost/passport-github/tree/master/examples/login)