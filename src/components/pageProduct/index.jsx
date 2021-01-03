import React from 'react';
import { useQuery } from '@apollo/client';
import GET_PRODUCT from '../../queries/getProduct';
import styles from './styles.module.scss';

const Product = (props) => {
  const id = props?.match?.params?.id;

  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading || !data) {
    return <h1>loading...</h1>;
  }

  const { products_by_pk: info } = data;

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.row}>
          <div className={styles.image} />
          <div className={styles.text}>
            <div className={styles.name}>{info.name}</div>
            <div className={styles.price}>${info.price}</div>
            <div className={styles.store}>{info.store}</div>
            <div className={styles.description}>{info.description}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.like}>Likes: {info.likes}</div>
          <div className={styles.save}>Saves: 10</div>
        </div>
      </div>
    </>
  );
};

export default Product;
