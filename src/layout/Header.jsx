import React from 'react'
import { InternetConnectivityStatus } from '@opensource/bit-scope.internet-connectivity-status'

export default function Header() {
  return (
    <div>
        <InternetConnectivityStatus />
    </div>
  )
}
