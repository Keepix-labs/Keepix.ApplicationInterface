"use client";

import AppsBase from "../Apps/AppsBase";
import { Form, Input, Checkbox } from '../Form/Form';
import Iframe from 'react-iframe';
import { useState, useEffect } from "react";
import { Icon } from '@iconify-icon/react';

export default function Terminal() {
  // Initialize the URL with a placeholder value
  const [iframeUrl, setIframeUrl] = useState('');

  // Function to update the iframe URL with the current host and protocol
  const updateIframeUrl = () => {
    const currentHost = window.location.hostname;
    const currentProtocol = window.location.protocol;
    setIframeUrl(`${currentProtocol}//${currentHost}:9001/ssh/host/${currentHost}?${Math.random()}`);
    console.log(`${currentProtocol}//${currentHost}:9001/ssh/host/${currentHost}?${Math.random()}`)
  };

  // Call the function to update the iframe URL when the component mounts (on the client-side)
  useEffect(() => {
    updateIframeUrl();
  }, []);

  return (
    <AppsBase title="Terminal" subTitle="Direct connection to your Keepix terminal, for the brave!" icon="ph:terminal">
      <Iframe url={iframeUrl}
        width="100%"
        height="500px"
        id=""
        className=""
        display="block"
        position="relative"/>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#" onClick={updateIframeUrl}>
          <Icon icon={"ph:arrows-clockwise"}/>
          <span style={{margin:10}}> Refresh terminal access</span>
        </a>
      </div>
    </AppsBase>
  );
}
