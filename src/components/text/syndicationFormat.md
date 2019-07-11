We want to showcase your reports on the Yorkshire Impact Dashboard.
All you need to do is provide a small amount of data, and we'll
do the rest! The format couldn't be simpler:

```yaml
url: <URL of the report landing page>
capital: <which of the six capitals the report refers to>
description: <a brief description of the report>
geography: <the ONS code which the report covers>
measure: <one or more measurements for optional aggregation>
```

Of these, only the first three (`url`, `capital` and `description` are required).

The capital needs to be one of the following:

* `social`
* `human`
* `natural`
* `intellectual`
* `financial`
* `manufacturing`

The geography is a single ONS code which defines the geography covered.
ONS codes can be looked up on the [Open Geography Portal](http://geoportal.statistics.gov.uk/) by clicking on the __Names and Codes__ menu item.

The `measure` key can be either a single value or multiple values of the following format:

```yaml
value: <numerical value>
unit: <unit of value>
label: <text description of value>
date: <the date of the value, in ISO8601 date format>
```

Only `value` is required. If date is ommitted, it is assumed to be
the latest report.

You can download: 
- [a minimal example](./examples/minimal.yaml) showing a minimal file. ([JSON version](./examples/minimal.json))
- [a full example](./examples/full.yaml) showing multiple reports and multiple measures. ([JSON version](./examples/full.json))