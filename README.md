# pings

Ping over HTTPS.

## Introduction

This is un simple tool in Nodejs for making network tests without QoS priority. It can truly reflect the latency for normal web surfing.

## Installation

```
npm i pings
```

## Usage

Use the following command to ping `example.com` for 8 times.

```
pings example.com 8
```

Each request is distinguished by un timestamp in the URL, so you do not need to worry about caching or HTTP 304.

## Copyright

Copyright (c) 2020 Neruthes (i@neruthes.xyz).

Published under GNU AGPL 3.0.

## Future Plans

- Stop depending on `request` package.
