# volunteero-gates

> Volunteero landing site frontend.
> Written in Vue.js, paired with authorization and public discovery serivces.

## Functionality   
The landing page is the first entry point to the Volunteero platform.   
> Hence the `volunteero-gates` name of this project  
  
The main purpose is to give a first introduction of the platform to the user.   
The users can `/discover` activities (_activities and campaigns_) and organizations present on the platform.  
Also the `gates` serve as the authorization endpoint for the users. At the `/join` route the users can _register_ or _login_.  
The authorized users by one of these means are then redirected to the main application endpoint of the platform: [`front-end-base`](https://github.com/Volunteero/volunteero-front-end-base)  


### Authorization  
The authorization mechanism is using the concept of [`jwt` tokens](https://jwt.io/) as explained in [`auth-service`](https://github.com/Volunteero/authentication-service)  
Once the user logs in (or registers) the token is saved in the cookies on the `gates` domain and the user is redirected to the main web app with the authorization token.  
This authenticates the user on the main web app and permits him to access all the features requiring the account.  

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# build for production and server at localhost:5000
npm start

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
