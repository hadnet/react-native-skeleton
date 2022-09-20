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

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Skeleton animation="pulse">
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
