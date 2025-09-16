import React, { Children } from "react";
import {Text} from 'react-native';
/**
    *@param {React.ReactNode} Children
    *@param {object} style
    *@param {number} scale
    *@param {object} rest
*/
export default function A11yText({children, style, scale =1, ...rest}){
    return(
        <Text
            allowFontScaling 
            accessible={false}
            style={style}
            {...rest}
        >
            {children}
        </Text>
    );
}