async function loadOneReport(options = {}) {
  const { url } = options;
  if (url === undefined) throw new Error('Please provide a URL');

  const networkRequest = await fetch(url);
  let content;
  try {
    content = await networkRequest.json();
  } catch (error) {
    console.error(error);
    return;
  }
  return content;
}

export async function loadReports(options) {
  const { source } = options;
  const networkRequest = await fetch(source);
  let reports = [];
  try {
    reports = await networkRequest.json();
  } catch (error) {
    throw error;
  }
  const reportData = await Promise.all(reports.map(url => loadOneReport({ url })));
  return reportData;
}
