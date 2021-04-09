
/*===== COMPONENT NOT CURRENTLY IN USE =====*/

import React from 'react';
import ArticlesSection from './ArticlesSection';

const ArticlesSectionsContainer = () => {
  const {articleYears} = this.props
  return (
    <main>
      {articleYears.forEach(year => {
        return (
          <ArticlesSection sectionYear={year}/>
        )
      })}
    </main>
  );
};

export default ArticlesSectionsContainer;