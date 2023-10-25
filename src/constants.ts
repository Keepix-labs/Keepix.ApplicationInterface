// constants.ts
let currentHost = '';
let currentProtocol = '';

if (process.browser) {
  currentHost = window.location.hostname;
  currentProtocol = window.location.protocol;
}


export const KEEPIX_API_URL = process.env.NEXT_PUBLIC_API_URL || `${currentProtocol}//${currentHost}:9000`
