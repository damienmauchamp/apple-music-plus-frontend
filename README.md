# AM+

## Run locally

```bash
npm install
cp .env.example .env.dev
npm run dev:dev # -- -p 3001
```

## Run on production

```bash
npm install # no --production
cp .env.example .env.production
npm run build:production
npm install pm2 -g
pm2 start npm --name "Apple Music Plus - Front" -- run start:production # -- -p 3001
pm2 startup
pm2 save
```

### Update on production

```bash
pm2 stop <ID> # OR pm2 stop "Apple Music Plus - Front"
git reset --hard
git pull
npm run build:production
pm2 restart <ID> # OR pm2 restart "Apple Music Plus - Front"
```

### Apache conf

```conf
Define APP_URL yourdomain.com
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

### Nginx conf

```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000; # Replace 3000 with your Next.js app's port
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
