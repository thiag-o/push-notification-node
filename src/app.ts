import webpush from 'web-push';
import express, { Application } from 'express';
import { subscriptionChrome, subscriptionEdge } from './subscriptionTest';
import { PushNotification } from './IPushNotification';

interface UserSubscription {
  userName: string;
  subscription: Subscription;
}

interface Subscription {
  endpoint: string;
  expirationTime: any;
  keys: Keys;
}

interface Keys {
  p256dh: string;
  auth: string;
}

const vapidKeys = {
  publicKey:
    'BOrp0ruYy1RDAcsZYVg52gn9N9f0hyti8AdANmjZaqZSihqFcHH5R2boE2YhwDnScLR5JIh8onLg2xDMZ-qWp78',
  privateKey: 'y9UZ8uK52ptxLKhVu6eV_oaWQibJY5XaVmT-Ko8if5I',
};

webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

const app: Application = express();

let object: UserSubscription[] = [
  {
    userName: 'Leo',
    subscription: subscriptionChrome,
  },
  {
    userName: 'Leo',
    subscription: subscriptionEdge,
  },
];

app.use(express.json());
// app.route('/api/addSubscription').post((req, res) => {
//   object.push(req.body);
//   res.json({ ...req.body });
// });

app.get('/', (req, res) => {
  res.send('ola');
});

app.route('/api/newsletter').post(sendNewsletter);
export function sendNewsletter(req: any, res: any) {
  const allSubscriptions = object;

  console.log('Total subscriptions', allSubscriptions.length);

  const notificationPayload: { notification: PushNotification } = {
    notification: {
      title: 'Chegou o Classe AA {{NAME}}',
      body: 'Uma nova notificação chegou!!',
      icon: '/assets/img/pwa-logo/192x192.png',
      vibrate: [100, 50, 100],
      image: '/assets/img/faq/banner_03.png',

      alert: {
        title: 'Chegou o Classe AA',
        subtitle: 'O seu novo programa da Agro Amazônia',
        body: 'Clique e veja as novidades!',
      },
      data: {
        onActionClick: {
          foo: {
            operation: 'openWindow',
            url: '/produtor/ganhe-pontos/produtos',
          },
        },
      },
      actions: [
        {
          action: 'foo',
          title: 'Veja Agora!',
        },
      ],
    },
  };
  console.log(JSON.stringify(allSubscriptions));

  Promise.all(
    allSubscriptions.map((sub: UserSubscription) => {
      const notification = notificationPayload;
      notification.notification.title = notification.notification.title.replace(
        '{{NAME}}',
        sub.userName
      );
      return webpush.sendNotification(sub.subscription, JSON.stringify(notification));
    })
  )
    .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
    .catch((err) => {
      console.error('Error sending notification, reason: ', err);
      res.sendStatus(500);
    });
}

app.listen(8000, () => console.log('rodando 8000'));
