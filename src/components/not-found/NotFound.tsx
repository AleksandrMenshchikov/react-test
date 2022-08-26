import React from 'react';
import styles from './NotFound.module.css';

function NotFound() {
  return <div className={styles.container}>404 | Страница не найдена</div>;
}

export default React.memo(NotFound);
