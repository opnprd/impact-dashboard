import Ajv from 'ajv';

import schema from './schemas/reportSyndicationFormat.json';

const ajv = new Ajv({ verbose: true });
const validate = ajv.compile(schema);

export function validateSyndicationFormat(report) {
  const valid = validate(report);
  let errors;
  if (!valid) {
    errors = Object.assign([], validate.errors);
  }
  return { valid, errors };
};
