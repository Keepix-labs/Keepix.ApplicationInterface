"use client";

import AppsBase from "../Apps/AppsBase";
import { Form, Input, Checkbox } from '../Form/Form';

export default function Settings() {
  return (
    <AppsBase title="Settings" subTitle="Define your Keepix preferences" icon="ph:sliders-horizontal">
      <Form>
        <h2 className="h2">Preferences Keepix</h2>
        <Input label="Max number of running app" name="maxNumber" icon="ph:list-numbers" required={true}>
          <input type="number" min="0" id="maxNumber" placeholder="Max number here"/>
        </Input>
        <Checkbox name="leds" label="Enable Leds of the Keepix" enabled="On" disabled="Off" />
      </Form>
    </AppsBase>
  );
}
