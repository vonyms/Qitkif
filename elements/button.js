/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {colors} from '../helpers/colors';
import {styles} from '../helpers/styles';

export default class Button extends Component {
  render() {
    return (
<TouchableOpacity
  onPress={() => this.props.onPress()}
  disabled={this.props.loading || this.props.disabled}
  activeOpacity={0.8}
  style={[
    styles.button,
    {backgroundColor: this.props.bg},
    this.props.loading || this.props.disabled ? {opacity: 0.8} : {},
    this.props.style,
  ]}
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel={this.props.title} // Set the button's label for screen readers
  accessibilityHint={this.props.loading || this.props.disabled ? 'Ce bouton est désactivé' : 'Appuyez pour ' + this.props.title} // Provides a hint about the action
>
  {this.setLoading()}
  <Text
    style={[
      styles.button_text,
      this.props.color ? {color: this.props.color} : {},
    ]}
    accessibilityRole="text"
  >
    {this.props.title}
  </Text>
</TouchableOpacity>

    );
  }
  setLoading() {
    if (this.props.loading) {
      return (
        <ActivityIndicator
          style={{marginRight: 5}}
          size="small"
          color={this.props.color ? this.props.color : colors.light}
        />
      );
    }
  }
}
