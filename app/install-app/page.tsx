'use client'
 
import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'
import PushNotificationManager from './PushNotificationManager'
import InstallPrompt from './InstallPrompt'


export default function Page() {
    return (
      <div>
        <PushNotificationManager />
        <InstallPrompt />
      </div>
    )
  }