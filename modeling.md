- データベースを使って管理するのは，「ユーザー」と「記事」
- ユーザーと記事にはユーザーが記事を書くという関わりがある。
- 記事はユーザーに従属している

### ユーザーの項目
1. id(主キー)
2. 名前

### 記事の項目
1. id(主キー)
2. 著者のID(外部キー)
3. 本文