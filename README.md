# nodejs-auth-jwt

## Reference

- [Dev Ed - Build A Node.js API Authentication With JWT Tutorial](https://www.youtube.com/watch?v=2jqok-WgelI)

## init && install dependencies

```sh
> yarn init -y

> yarn add express mongoose dotenv

> yarn add -D nodemon
```

## validator : parameter 검증

- JSON validator for Node.js and browser
  - [ajv](https://www.npmjs.com/package/ajv):
  - [ajv-formats](https://www.npmjs.com/package/ajv-formats)

```sh
> yarn add ajv ajv-formats
```

- [ajv JSON schema](https://ajv.js.org/json-schema.html)

```js
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Validation
const ajv = new Ajv();
addFormats(ajv, { mode: 'fast' }); // format : email

const schema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 6 },
		email: { type: 'string', minLength: 6, format: 'email' },
		password: { type: 'string', minLength: 6 },
	},
	required: ['name', 'email', 'password'],
	additionalProperties: false,
};

const validate = ajv.compile(schema);

router.post('/register', async (req, res) => {
	// lets validate the data before we make a user
	const validation = validate(req.body);
	res.send(validation);
});
```

## [bcrypt.js](https://github.com/dcodeIO/bcrypt.js#readme)

```sh
> yarn add bcryptjs
```

```js
const bcrypt = require('bcryptjs');

// Hash passwords
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(req.body.password, salt);
```

## [jsonwebtoken](https://jwt.io/)

```sh
> yarn add jsonwebtoken
```

```js
// Create and assign a token
const token = jwt.sign(
	{
		_id: user._id,
	},
	process.env.TOKEN_SECRET
);
res.header('auth-token', token).send(token);
```
