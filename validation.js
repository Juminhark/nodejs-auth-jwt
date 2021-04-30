const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv();
addFormats(ajv, { mode: 'fast' });

const registerValidation = (data) => {
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
	const valid = validate(data);

	if (!valid) {
		const errors = {
			path: validate.errors[0].instancePath.substr(1),
			message: validate.errors[0].message,
		};
		return { errors };
	}

	return valid;
};

const loginValidation = (data) => {
	const schema = {
		type: 'object',
		properties: {
			email: { type: 'string', minLength: 6, format: 'email' },
			password: { type: 'string', minLength: 6 },
		},
		required: ['email', 'password'],
		additionalProperties: false,
	};

	const validate = ajv.compile(schema);
	const valid = validate(data);

	if (!valid) {
		const errors = {
			path: validate.errors[0].instancePath.substr(1),
			message: validate.errors[0].message,
		};
		return { errors };
	}

	return valid;
};

module.exports = { registerValidation, loginValidation };
