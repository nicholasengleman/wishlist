import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import GET_PRODUCTS from '../../../../queries/getProducts';

import styles from './styles.module.scss';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <>
      {data.products.map((el) => (
        //  <Link to={`product/${el.id}`}>
        <div className={styles.product} key={`${Math.random()}`}>
          <div className={styles.image} />
          <div className={styles.content}>
            <div className={styles.row}>
              <div className={styles.name}>{el.name}</div>
              <div className={styles.price}>${el.price}</div>
            </div>
            <div className={styles.store}>{el.store}</div>
            <div className={styles.description}>{el.description}</div>

            <div className={styles.actions}>
              <div className={styles.likes}>Likes: {el.likes}</div>
              <div className={styles.copies} />
            </div>
            <Link to={`user/${el.creatorId}`}>
              <div className={styles.row}>{el.creatorId}</div>
            </Link>
          </div>
        </div>
        // </Link>
      ))}
    </>
  );
};

export default ProductList;
