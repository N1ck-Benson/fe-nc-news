import React from 'react';

const ArticlesHeader = (params) => {
  const { sectionYear } = params;
  return (
    <header className="articles-header">
      <h2>{sectionYear}</h2>
      <nav>Order by: [criteria]</nav>
    </header>
  );
};

export default ArticlesHeader;