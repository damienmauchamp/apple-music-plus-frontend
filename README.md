npm install
cp .env.example .env.dev
npm run dev:dev {-- -p 3001}

npm install --production
cp .env.example .env.production
npm run build:production
npm install pm2 -g
pm2 start npm --name "AM+" -- start:production {-p 3001}

```conf
Define APP_URL amplus.dmchp.fr
Define APP_LOCAL_URL http://localhost:3000

<VirtualHost *:80>
    ServerName ${APP_URL}

    ProxyPass / ${APP_LOCAL_URL}/
    ProxyPassReverse / ${APP_LOCAL_URL}/

    <Proxy *>
        Require all granted
    </Proxy>

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-Port "80"
    RequestHeader set Host "${APP_URL}"
</VirtualHost>
```
