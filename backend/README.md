# Canvan Backend Setup

### Install dependencies

```
npm install
```

### .env Setup

Before starting the server you need to configure your `.env` file.
Enter your credentials for Google Login API and Github Login API.

```
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=YOUR_DOMAIN_NAME/auth/google/callback
GITHUB_CLIENT_ID=YOU_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL=YOUR_DOMAIN_NAME/auth/github/callback
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Runs for production

```
npm run prod
```

### Lints and fixes files

```
npm run lint
```
