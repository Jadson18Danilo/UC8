import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  AccessibilityInfo,
  AppState,
  findNodeHandle,
} from "react-native";
import {makeTheme} from "../styles/theme";
import {makeGlobalStyles} from "../styles/globalStyles";

import HomeScreen from "./HomeScreen";
import LockScreen from "./LockScreen";
import SettingsScreen from "./SettingsScreen";