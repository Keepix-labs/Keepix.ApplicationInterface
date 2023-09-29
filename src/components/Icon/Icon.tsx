"use client";

import React from "react";

import AddCircle from "/public/img/icons/add_circle.svg";
import MonitorHeart from "/public/img/icons/monitor_heart.svg";
import Tune from "/public/img/icons/tune.svg";
import WebAsset from "/public/img/icons/web_asset.svg";

const iconTypes: {
  [key: string]: any;
} = {
  add_circle: AddCircle,
  monitor_heart: MonitorHeart,
  tune: Tune,
  web_asset: WebAsset,
};

export default function Icon({ name }: { name: string }) {
  let TempIcon = iconTypes[name];
  return <TempIcon />;
}
