# notion_clone

notionの複製アプリです。

## 概要
以下の機能をサポートしています。
- 記事の作成，読み込み，更新，削除機能
- ユーザーの新規登録機能
- ログイン機能

## アプリケーションの構成

フロントエンド: React.js + TypeScript
- UIライブラリとして Chakra UI を使用しています。
- 記事の編集ページでは，サイドバーにユーザーの記事一覧を表示し，選択した記事を編集できるようにしています。
- 選択した記事のCRUD操作を行うフォームを実装しています。

バックエンド: Node.js + Express.js
- APIサーバーとして機能し、クライアントからのリクエストに応じてデータのCRUD操作を行います。
- MongoDBをデータベースとして使用しています。
- ユーザーの認証にJWTを使用しています。

パッケージ管理にはnpmを使用しており、monorepo構成にするためにnpm workspaceを使用しています。

## 使い方
アプリケーションのインストールを以下の手順に従って行います。

1. ターミナル上で，このリポジトリをクローンします。
```
git@github.com:ntk221/notion_clone.git
```

2. クローンしたリポジトリに移動して，プロジェクトのルートディレクトリで`npm install`コマンドを実行し，アプリケーションの依存関係をインストールします。
```
cd notion_clone
npm install
```

次に，アプリケーションに必要な設定を行います。アプリケーションを起動するために，backendディレクトリに.envファイルを用意する必要があります。
```
cd packages/backend
touch .env
```
.envファイルには，MongoDBのURIを表す`MONGO_URI`と,JWTトークンのための秘密鍵を表す`JWT_SECRET`の値を設定してください。

次に，アプリケーションの起動は以下の手順に従います。

1. ターミナルを2つ起動します。

2. 一方のターミナルで次のコマンドを実行します。
```
npm run start:backend
```
サーバーが立ち上がると，`start listening`というメッセージが表示されます。

3. もう一方のターミナルで次のコマンドを実行します。
```
npm run start:frontend
```

`http://localhost:3000`にアクセスするとアプリケーションが使用できます。

## 参考サイト,書籍など
- https://www.npmjs.com/ (npm公式サイト)
- https://chakra-ui.com/ (chakra-ui公式サイト)
- https://www.udemy.com/course/notion-fullstack-webdev/ (Udemyの講座)
- https://gihyo.jp/book/2023/978-4-297-12956-9 (ディレクトリ構成などについて，参考になりました)

