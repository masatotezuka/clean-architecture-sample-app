# clean-architecture-sample-app

Clean Architecture を学習するために作成したサンプルアプリです。

## Setup

### 初回

```sh
docker compose up
```

### 初回以降

```sh
docker compose up -d
```

http://localhost:8000/healthcheck
にアクセスして、OK! と表示されれば環境構築が完了

## Tech

| カテゴリー     | 技術名                |
| -------------- | --------------------- |
| 言語           | TypeScript            |
| フレームワーク | Express               |
| ORM            | Prisma                |
| DB             | MySQL                 |
| その他         | Docker, tsyringe, zod |
