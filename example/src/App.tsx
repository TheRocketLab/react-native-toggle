import { useState } from 'react';
import * as React from 'react';

import { Text } from 'react-native';
import styled from 'styled-components/native';

import Toggle from './toggle';
// import Toggle from 'rktlab-react-native-toggle';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Spacer = styled.View`
  margin-top: 20px;
`;

export default function App() {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const onValueChange = (value: boolean) => setActive(value);
  const onValueChange2 = (value: boolean) => setActive2(value);
  const onValueChange3 = (value: boolean) => setActive3(value);
  const onValueChange4 = (value: boolean) => setActive4(value);

  return (
    <View>
      <Toggle onValueChange={onValueChange} value={active} />

      <Toggle
        onValueChange={onValueChange2}
        value={active2}
        disabled
        labels={['Toggle Disabled']}
      />
      <Toggle
        onValueChange={onValueChange3}
        value={active3}
        labels={['Toggle with custom Icon']}
      >
        <Text>{active3 ? '✓' : 'X'}</Text>
      </Toggle>
      <Toggle
        onValueChange={onValueChange4}
        value={active4}
        labels={['Off', 'On']}
        disabled
        labelType="both"
        toggleBarColor={active4 ? 'blue' : 'red'}
      />
      <Spacer>
        <Toggle
          onValueChange={onValueChange}
          value={active}
          labels={['Left label']}
          labelType="left"
        />
        <Toggle
          onValueChange={onValueChange}
          value={active}
          labels={['Right label']}
          labelType="right"
        />
      </Spacer>
    </View>
  );
}
