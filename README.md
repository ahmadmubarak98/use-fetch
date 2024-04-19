[![@ahmadmubarak98/use-fetch](https://i.imgur.com/UpFThcB.png)](https://github.com/ahmadmubarak98/use-fetch)

<p align="center">
  <a aria-label="Made By" href="https://github.com/ahmadmubarak98">
    <img src="https://badgen.net/badge/icon/Made%20by%20@ahmadmubarak98?label&color=black&labelColor=black">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@ahmadmubarak98/use-fetch">
    <img alt="" src="https://badgen.net/npm/v/@ahmadmubarak98/use-fetch">
  </a>
  <a aria-label="NPM publish" href="https://github.com/ahmadmubarak98/use-fetch/actions/workflows/npm-publish.yml">
    <img alt="" src="https://github.com/ahmadmubarak98/use-fetch/actions/workflows/npm-publish.yml/badge.svg?branch=main">
  </a>
</p>

## Introduction

Welcome to `@ahmadmubarak98/use-fetch`, a lightweight and powerful React hook library designed to simplify fetching data within your React applications. This custom hook leverages the modern React features to make HTTP requests more straightforward and efficient, while also handling cache, loading states and errors gracefully.

## Installation

```npm install @ahmadmubarak98/use-fetch```

## Quick Start

```jsx
import { useFetch } from '@ahmadmubarak98/use-fetch'

function ExampleComponent() {
  const { data, error, isLoading } = useFetch({ url: 'https://dummyjson.com/users/1' })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

## License

The MIT License.
