# Elasticsearch OpenAI Chatbot

## Overview

This project contains Elastic Hal, an example ChatBot leveraging Elasticsearch and the OpenAI ChatCompletion API. This sample forms the basis of [Daily Elastic Bytes S5 E15](https://youtube-todo).

![Elastic Hal Screenshot](./public/images/screenshot.png)

## Architecture

As shown in the below diagram, this is a simple 3-tier web application:

![Elastic Hal Architecture](./public/images/architecture.png)

It contains: 

1. A simple framework independent HTML, JavaScript and CSS UI (`index.html|js|css`). 
2. Node.js Express server (`server/server.js`) with utilities for communication between Elasticsearch and the Chat Completion API from OpenAI.
3. Elasticsearch data store, containing answers and solutions from [http://discuss.elastic.co](http://discuss.elastic.co).

## How to run

The server, accessible at `http://localhost:3000/`, can be started using the below command:

```bash
npm install
node server/server.js
```

The application can be accessed by opening `index.html` in your browser.

## Resources

Check out the relevant resources used in this project:

1. [Elasticsearch]()
2. [Elasticsearch JavaScript client]()
3. [Elasticsearch blog]()
4. [OpenAI Inference API]()
5. [Express]()

Additionally, to speed up development when using JavaScript frameworks like React and Angular, check out the below component libraries and utilities referenced in the [Daily Elastic Byte recording]():

1. [SearchKit]()
2. [Algolia]()