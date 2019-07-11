import yaml from 'js-yaml';
import { validateSyndicationFormat } from './validate';

async function loadOneReport(options = {}) {
  const { url, action } = options;
  if (url === undefined) throw new Error('Please provide a URL');

  let content;
  try {
    const networkRequest = await fetch(url);
    const rawContent = await networkRequest.text();
    content = yaml.safeLoad(rawContent);
  } catch (error) {
    console.error(error.message);
    return;
  }
  if (validateSyndicationFormat(content).valid) {
    action(content);
  }
}

export async function loadReports(options) {
  const { source, action } = options;
  const networkRequest = await fetch(source);
  let reports = [];
  try {
    reports = await networkRequest.json();
  } catch (error) {
    throw error;
  }
  await Promise.all(reports.map(url => loadOneReport({ url, action })));
}
