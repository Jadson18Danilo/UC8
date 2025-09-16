import React from "react";

import { Pressable, Text } from "react-native";
/** 
*@param {string} title
*@param {function} onPress
*@param {object} style
*@param {object} textStyle
*@param {string} accessibilityLabel
*@param {string} accessibilityHint
*@param {string} role
*/
export default function BigButton({
    title,
    onPress,
    style,
    textStyle,
    accessibilityHint,
    accessibilityLabel,
    role = "button"
}){
    return(
        <Pressable
            onPress={onPress}
            style={style}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel || title}
            accessibilityRole={role}

            android_ripple={{color: "#00000022"}}
        
        >
            <Text style={textStyle}>{title}</Text>
        </Pressable>
    )
}