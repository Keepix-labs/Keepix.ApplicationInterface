"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Icon } from '@iconify-icon/react';

/** Form container */

type PropsForm = {
  children: ReactNode;
}

export const Form = ({ children }: PropsForm) => {
  return (
    <form className={styles.form}>
      {children}
    </form>
  )
}

/** Input wrapper with label */

type PropsInput = {
  label: string;
  small?: string;
  name?: string;
  icon?: string;
  required?: boolean;
  children: ReactNode;
}

export const Input = ({ label, small, name, icon, required, children }: PropsInput) => {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}: {required && <abbr title="Required">*</abbr>}
        {small && <small>{small}</small>}
      </label>
      <div className={styles.input}>
        {icon && <Icon icon={icon} />}
        {children}
        <span></span>
      </div>
    </div>
  )
}

/** Radio / Checkbox */

type TypeCheckbox = "radio" | "checkbox"

type PropsCheckbox = {
  label: string;
  name: string;
  enabled?: string;
  disabled?: string;
  type?: TypeCheckbox;
}

export const Checkbox = ({ label, name, type = 'checkbox', enabled, disabled }: PropsCheckbox) => {
  return (
    <div className={styles.checkbox}>
      <div className={styles.label}>{label}:</div>
      <input id={name} name={name} type={type} />
      <label className={styles.checkboxCase} htmlFor={name}>
        {disabled && <span className={styles.checkboxCaseDisabled}>{disabled}</span>}
        {enabled && <span className={styles.checkboxCaseEnabled}>{enabled}</span>}
      </label>
    </div>
  )
}

