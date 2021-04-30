# nodejs-auth-jwt

## Reference

- [Dev Ed - Build A Node.js API Authentication With JWT Tutorial](https://www.youtube.com/watch?v=2jqok-WgelI)

## init && install dependencies

```sh
> yarn init -y

> yarn add express mongoose dotenv

> yarn add -D nodemon
```

## parameter 검증

- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) : data validator for JavaScript.

```sh
> yarn add @hapi/joi
```

```js
const Joi = require('@hapi/joi');

// validate Definition
const schema = {
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
};

// lets validate the data before we make a user
const validation = Joi.validate(req.body, schema);
```
