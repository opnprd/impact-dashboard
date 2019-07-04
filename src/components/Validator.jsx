
import React from 'react';

import syndicationBlurb from './text/syndicationFormat.md';

export default function Validator() {
  return <><section
    dangerouslySetInnerHTML={{ __html: syndicationBlurb }}
  >
  </section></>;
}
