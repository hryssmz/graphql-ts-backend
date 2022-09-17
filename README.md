# README

## 1. Setup

---

### 1.1. Initialize Project

---

```bash
mkdir graphql-ts-api
cd graphql-ts-api/
npm init --yes
```

### 1.2. Development Dependencies

---

#### 1.2.1. TypeScript

---

```bash
npm install -D ts-node @types/node
npx tsc --init
```

#### 1.2.2. Prettier

---

```bash
npm install -D prettier prettier-plugin-sh
```

#### 1.2.3. ESLint

---

```bash
npm install -D eslint eslint-config-prettier eslint-plugin-import
# npm init @eslint/config
```

### 1.3. Initialize Express Project

---

#### 1.3.1. Express

---

```bash
npm install express
npm install -D @types/express
```

#### 1.3.2. Prisma Client

---

```bash
npm install @prisma/client
npm install -D prisma
```

#### 1.3.3. HTTP errors

---

```bash
npm install http-errors
npm install -D @types/http-errors
```

#### 1.3.4. morgan

---

```bash
npm install morgan
npm install -D @types/morgan
```

#### 1.3.5. dotenv

---

```bash
npm install dotenv
```

#### 1.3.6. Apollo Server

---

```bash
npm install apollo-server-express apollo-server-core graphql
```
