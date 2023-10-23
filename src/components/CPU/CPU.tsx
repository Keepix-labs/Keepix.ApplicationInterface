"use client";

import { Icon } from '@iconify-icon/react';
import styles from "./styles.module.scss";
import { useEffect, useState } from 'react';

/** Jauge */

type PropsJauge = {
  max: number,
  value: number,
  unit?: string
}

const Jauge = ({ max, value, unit }: PropsJauge) => {
  const gradientId = 'temperature-gradient' 
  const path = "M2,108.2C2,49.6,49.6,2,108.2,2s106.2,47.6,106.2,106.2"

  const colors = [
    {
      offset: '0%',
      style: styles.stop1
    },
    {
      offset: '25%',
      style: styles.stop2
    },
    {
      offset: '50%',
      style: styles.stop3
    },
    {
      offset: '100%',
      style: styles.stop4
    }
  ]

  const maxCircle = 340
  const percent = (maxCircle * value) / max
  
  const percentJauge = (100 * value) / max
  const styleJauge = { "--percent": `${percentJauge}%` } as React.CSSProperties

  return (
    <div className={styles.jauge} style={styleJauge}>
      <svg className={styles.jaugeSvg} viewBox="0 0 216.5 108.2">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <stop key={index} offset={color.offset} className={color.style} />
            ))}
          </linearGradient>
        </defs>
        <path className={styles.jaugeBack} d={path}/>
        <path 
          className={styles.jaugeGradient} 
          d={path} 
          stroke={`url(#${gradientId})`} 
          strokeDasharray={`${percent} ${maxCircle}`}
        />
      </svg>
      <strong className={styles.jaugeTxt}>{value}{unit}</strong>
    </div>
  )
}

/** Right Info */

type PropsRight = {
  icon: string,
  name: string,
  max: number,
  value: number,
  unit?: string
}

const Right = ({ icon, name, max, value, unit }: PropsRight) => {
  return (
    <div className={styles.cpuRight}>
      <small>{name}</small>
      <span>
        <strong>{value}{unit}</strong> / {max}{unit}
      </span>
      <Icon className={styles.cpuRightSvg} icon={icon} />
    </div>
  )
}

/** CPU Component */

export default function CPU() {

  const [measures, setMeasures] = useState([
    {
      name: "CPU Load",
      max: 100,
      value: 5,
      fixed: 0,
      unit: "%",
      icon: "ph:cpu-thin"
    },
    {
      name: "CPU Temp",
      max: 120,
      value: 51,
      fixed: 0,
      unit: "°",
      icon: "ph:thermometer-simple-thin"
    },
    {
      name: "Memory",
      max: 4.04,
      value: 3.57,
      fixed: 2,
      unit: "",
      icon: "ph:database-thin"
    }
  ])

  // random placeholder example

  const getRandomValue = (max: number, fixed: number) => (Math.random() * max).toFixed(fixed)
  
  const updateMeasures = () => {
    const updatedMeasures = measures.map((measure) => ({
      ...measure,
      value: getRandomValue(measure.max, measure.fixed),
    }))
    setMeasures(updatedMeasures as any)
  }
  
  useEffect(() => {
    const intervalId = setInterval(updateMeasures, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  
  return (
    <div className={styles.cpu}>
      {measures.map((measure, index) => (
        <div key={index} className={styles.cpuItem}>
          <Jauge max={measure.max} value={measure.value} unit={measure.unit} />
          <Right icon={measure.icon} max={measure.max} value={measure.value} name={measure.name} unit={measure.unit} />
        </div>
      ))}
    </div>
  )
}