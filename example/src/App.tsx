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
  gap: 10px;
`;

const Spacer = styled.View`
  margin-top: 20px;
  align-items: center;
  gap: 10px;
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

  const iconStyle = {
    color: 'black',
    fontSize: 12,
  };

  const textSizes = {
    fontSize: 24,
  };

  return (
    <View>
      <Spacer>
        <Text style={textSizes}>MATERIAL EXAMPLES</Text>
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
          offIcon={<Text style={iconStyle}>X</Text>}
          onIcon={<Text>✓</Text>}
          styleType="material"
        />
        <Toggle
          onValueChange={onValueChange4}
          value={active4}
          labels={['Off', 'On']}
          labelType="both"
        />
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
          customTrackColor={{ on: 'orange', off: '#d04043' }}
          customCircleColor={{ off: 'rgb(255, 255, 255)', on: 'rgb(0, 0, 0)' }}
        />
      </Spacer>
      <Spacer>
        <Text style={textSizes}>STOCK EXAMPLES</Text>
        <Toggle
          onValueChange={onValueChange}
          value={active}
          styleType="stock"
        />
        <Toggle
          onValueChange={onValueChange2}
          value={active2}
          disabled
          labels={['Toggle Disabled']}
          styleType="stock"
        />
        <Toggle
          onValueChange={onValueChange3}
          value={active3}
          labels={['Toggle with custom Icon']}
          offIcon={<Text style={iconStyle}>X</Text>}
          onIcon={<Text>✓</Text>}
          styleType="stock"
        />
        <Toggle
          onValueChange={onValueChange4}
          value={active4}
          labels={['Off', 'On']}
          labelType="both"
          styleType="stock"
          customTrackColor={{ on: 'blue', off: 'red' }}
        />
        <Toggle
          onValueChange={onValueChange}
          value={active}
          labels={['Left label']}
          labelType="left"
          styleType="stock"
        />
        <Toggle
          onValueChange={onValueChange}
          value={active}
          labels={['Right label']}
          labelType="right"
          styleType="stock"
        />
      </Spacer>
    </View>
  );
}
