import React from 'react';
import styles from './styles.module.scss';
import ProductList from './children/ProductList';

const pageHome = () => (
  <div className={styles.pageContainer}>
    <ProductList />
  </div>
);

export default pageHome;
