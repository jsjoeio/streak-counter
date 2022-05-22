# `@jsjoeio/streak-counter` - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

![gif of streak counter](https://media.giphy.com/media/4yBvKF2QhyXUUkOMqx/giphy.gif)

## Install

```shell
yarn add @jsjoeio/streak-counter
```

```shell
npm install @jsjoeio/streak-counter
```

### Usage

[![Edit streak-counter (egghead)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/streak-counter-egghead-twsw1?fontsize=14&hidenavigation=1&theme=dark)

```typescript
import { streakCounter } from "@jsjoeio/streak-counter";

const today = new Date();
const streak = streakCounter(localStorage, today);
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```
