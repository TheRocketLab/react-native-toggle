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
   * <Toggle>
   *  <Text>✓</Text>
   * </Toggle>
   * ```
   */
  children?: React.ReactNode;
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
  toggleBarColor?: string;
};
