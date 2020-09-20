import { Link } from 'gatsby';
import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import BlockText from './block-text';
import styles from './project-preview.module.css';

function ProjectPreview({ slug, mainImage, title, _rawExcerpt, locale }) {
  return (
    <Link className={styles.root} to={slug}>
      <div className={styles.leadMediaThumb}>
        {mainImage && mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={mainImage?.alt?.[locale]}
          />
        )}
      </div>
      <h3>{title}</h3>
      {_rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </Link>
  );
}

export default ProjectPreview;
