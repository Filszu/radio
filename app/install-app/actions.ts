'use server';

import webpush from 'web-push';

webpush.setVapidDetails(
    'mailto:admin@ciac.me',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
);

// Define a new type that extends PushSubscription
interface ExtendedPushSubscription extends PushSubscription {
    keys: {
        p256dh: string;
        auth: string;
    };
}

// Update the subscription variable to use the new type
let subscription: ExtendedPushSubscription | PushSubscription | null = null;

export async function subscribeUser(sub: ExtendedPushSubscription) {
    subscription = sub;
    // In a production environment, you would want to store the subscription in a database
    // For example: await db.subscriptions.create({ data: sub })
    return { success: true };
}

export async function unsubscribeUser() {
    subscription = null;
    // In a production environment, you would want to remove the subscription from the database
    // For example: await db.subscriptions.delete({ where: { ... } })
    return { success: true };
}

export async function sendNotification(message: string) {
    if (!subscription) {
        throw new Error('No subscription available');
    }

    try {
        console.log('subscription', subscription);
        await webpush.sendNotification(
            subscription as ExtendedPushSubscription,
            JSON.stringify({
                title: 'Test Notification',
                body: message,
                icon: '/icon.png',
            }),
        );
        return { success: true };
    } catch (error) {
        console.error('Error sending push notification:', error);
        return { success: false, error: 'Failed to send notification' };
    }
}
