# @hadnet/react-native-skeleton

A nice RN Skeleton using Reanimated for better performance

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)]()
![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=for-the-badge&colorB=191A17)
[![Version](https://img.shields.io/npm/v/@hadnet/react-native-skeleton.svg?style=for-the-badge)](https://www.npmjs.com/package/@hadnet/react-native-skeleton)
[![npm](https://img.shields.io/npm/dt/@hadnet/react-native-skeleton.svg?style=for-the-badge)](https://www.npmjs.com/package/@hadnet/react-native-skeleton)

<div>
<img src="https://user-images.githubusercontent.com/13828833/191178624-add635f7-d18a-4859-8d8b-62881047d9ca.gif" width="300" />

<img src="https://user-images.githubusercontent.com/13828833/191179861-f580ccde-eb38-4f65-8d3b-aa44dde2725c.gif" width="300" />
</div>

<div>
<img src="https://user-images.githubusercontent.com/13828833/191179650-af1114fb-7b13-47ae-813c-081cdc497444.gif" width="300" />

<img src="https://user-images.githubusercontent.com/13828833/191180338-94f10391-a6cf-44fe-9533-6c92688d2887.gif" width="300"/>
</div>

## Installation

```sh
yarn add @hadnet/react-native-skeleton@alpha
```

```sh
npm install @hadnet/react-native-skeleton@alpha
```

### Dependencies

```sh
  yarn add react-native-linear-gradient @react-native-masked-view/masked-view @react-native-reanimated
```

```sh
  npm install react-native-linear-gradient @react-native-masked-view/masked-view @react-native-reanimated
```

##### Add `'react-native-reanimated/plugin'` to your babel.config.js file

```js
plugins: [
   // ...
   'react-native-reanimated/plugin', // it's placed at the end
]
```

```sh
  cd ios && pod install && cd ..
```

## Usage

```tsx
import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  Skeleton,
  Circle,
  Card,
  Lines,
  Box,
  Line,
  Row,
  Col,
} from '@hadnet/react-native-skeleton';

export default function MySkeletonComp() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Skeleton animation="wave" /* dark={true} */>
          <Col space={12}>
            <Row space={12}>
              <Box />
              <Col space={8}>
                <Line as="lines" n={2} />
              </Col>
            </Row>
            <Col space={8}>
              <Line />
              <Line />
            </Col>
            <Row space={12}>
              <Col space={8}>
                <Line as="lines" n={2} />
              </Col>
              <Circle />
            </Row>
            <Card height={150} />
            <Lines n={3} random />
          </Col>
        </Skeleton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  wrapper: {
    width: '80%',
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
