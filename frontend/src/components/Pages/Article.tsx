import React, { useContext } from 'react';
import { ArticleContext } from '../Layout/AppLayout';

function Article() {
  const { selectedArticle } = useContext(ArticleContext);

  if (!selectedArticle) {
    return <div>No article selected</div>;
  }

  return (
    <div>
      <h1>{selectedArticle.title}</h1>
      <p>{selectedArticle.body}</p>
      {/* ここに記事の情報を表示するコードを書く */}
    </div>
  );
}

export default Article;
