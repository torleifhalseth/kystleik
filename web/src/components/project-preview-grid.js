import { Link } from 'gatsby';
import React from 'react';
import ProjectPreview from './project-preview';
import styles from './project-preview-grid.module.css';

function ProjectPreviewGrid({ title, browseMoreHref, nodes, locale }) {
  return (
    <div className={styles.root}>
      {title && (
        <h2 className={styles.headline}>
          {browseMoreHref ? <Link to={browseMoreHref}>{title}</Link> : title}
        </h2>
      )}
      <ul className={styles.grid}>
        {nodes &&
          nodes.map(node => (
            <li key={node.title}>
              <ProjectPreview {...node} locale={locale} />
            </li>
          ))}
      </ul>
    </div>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
  locale: 'nb',
};

export default ProjectPreviewGrid;
