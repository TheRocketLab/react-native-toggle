import type { TextStyle } from 'react-native';

export type ToggleProps = {
  /**
   * Callback called when the toggle is pressed.
   * @param {boolean} value - The value of the toggle after the press.
   * @default false
   * #### Example
   * ```jsx
   * <Toggle onValueChange={(value) => console.log(value)} />
   * ```
   */
  onValueChange: (value: boolean) => void;
  /**
   * The value of the toggle. If true the toggle will be turned on.
   * @default false
   */
  value?: boolean;
  /**
   * Pass a component to be rendered inside the toggles circle.
   * @default null
   * #### Example
   * ```jsx
   * <Toggle
   *    offIcon={<Text>X</Text>}
   * />
   * ```
   */
  offIcon?: React.ReactNode;
  /**
   * Pass a component to be rendered inside the toggles circle.
   * @default null
   * #### Example
   * ```jsx
   * <Toggle
        onIcon={<Text>✓</Text>}
    * />
   * ```
   */
  onIcon?: React.ReactNode;
  /**
   * The label or labels of the toggle.
   * Labels need to be passed as an array of strings.
   * @default null
   * #### Example
   * ```jsx
   * <Toggle labels={['off', 'on']} />
   * ```
   */
  labels?: string[];
  /**
   * The position of the label / labels.
   * @default 'top'
   * Note: if you don't choose a labelType, the label will be on top
   * */
  labelType?: 'top' | 'left' | 'right' | 'both';
  /**
   * The styles for the label or labels of the toggle.
   * These styles will be applied to the corresponding labels in the order they are provided.
   * If a single style object is provided, it will be applied to all labels.
   * If an array of style objects is provided, they will be applied to the corresponding labels
   * in the order they are provided. For example, the first style object in the array will be applied
   * to the first label, the second to the second label, and so on.
   * If there are more labels than style objects, the additional labels will not receive any custom styles.
   *
   * @default undefined
   * #### Example
   * ```jsx
   * // Single style for all labels
   * <Toggle labels={['off', 'on']} labelStyles={{color: 'red', fontSize: 16}} />
   *
   * // Different styles for each label
   * <Toggle labels={['off', 'on']} labelStyles={[{color: 'red', fontSize: 16}, {color: 'blue', fontSize: 20}]} />
   * ```
   */
  labelStyles?: TextStyle | TextStyle[];
  disabled?: boolean;
  /**
   * The color of the toggle when it is turned on.
   * @default #6750a4
   *
   * You can change the colour for both toggle on and off by using toggleBarColor
   *  ### Example
   * ```jsx
   *    toggleBarColor={active ? 'red' : 'blue'}
   * ```
   * Here active is a boolean value which comes from the state to
   * handle the toggle on and off.
   */
  styleType?: 'material' | 'stock' | 'bordered';
  /**
   * The color of trackbar when toggled.
   *
   *  ### Example
   * ```jsx
   * customTrackColor={{ on: 'blue', off: 'red' }}
   * ```
   */
  customTrackColor?: { off: string; on: string };
  /**
   * The color of the toggle when it is toggled.
   *
   *  ### Example
   * ```jsx
   * customCircleColor={{ off: 'rgb(255, 255, 255)', on: 'rgb(0, 0, 0)' }}
   * ```
   */
  customCircleColor?: { off: string; on: string };
  customFont?: string;
};

export type disabledProps = {
  disabled?: boolean;
};

export type SwitchContainerProps = {
  styleType?: string;
  active?: boolean;
};

export type CircleProps = disabledProps & SwitchContainerProps;
