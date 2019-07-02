
import React from 'react';

import syndicationBlurb from './text/syndicationFormat.md';

export default function Validator() {
  return <><div
    dangerouslySetInnerHTML={{ __html: syndicationBlurb }}
  >
  </div></>;
}
