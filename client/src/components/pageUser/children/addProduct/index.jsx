import React, { useState } from 'react';
import StyledAddProduct from './addProductStyles';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import UPDATE_USER_WISHES from '../../../../queries/updateUserWishes';
import GET_USER_WISHES from '../../../../queries/getUserWishes';
import GET_TAGS from '../../../../queries/getTags';

const addProduct = ({ visibility, setVisibility }) => {
  const id = props.match.params.id;
  const { register, handleSubmit, reset } = useForm();
  const [addProduct, { data }] = useMutation(UPDATE_USER_WISHES);
  const { loading: loadingTags, data: dataTags } = useQuery(GET_TAGS);

  const [section, setSection] = useState(1);

  const onClose = () => {
    setVisibility(false);
    reset();
    window.setTimeout(() => {
      setSection(1);
    }, 300);
  };

  const onSubmit = (data) => {
    const variables = {
      ...data,
      price: parseInt(data.price),
      categoryId: '11',
      userId: id,
    };

    addProduct({
      variables,
      refetchQueries: [{ query: GET_USER_WISHES, variables: { id } }],
    });
    onClose();
  };

  return (
    <StyledAddProduct visibility={visibility}>
      <div className="form-header">
        <div className="text">
          <div className="title">New Product</div>
          <div className="subtitle">
            Fill out the information below to get started!
          </div>
        </div>
        <div className="close" onClick={onClose}>
          X
        </div>
      </div>
      <div className="form-sections">
        <button
          className={`section ${section === 1 ? 'selected' : ''}`}
          onClick={() => setSection(1)}
        >
          1. <span>Basic</span>
        </button>
        <button
          className={`section ${section === 2 ? 'selected' : ''}`}
          onClick={() => setSection(2)}
        >
          2. <span>Contributions</span>
        </button>
      </div>

      <form className={`panel-container section-${section}-selected`}>
        <div className="panel">
          <div className="flex-container">
            <div className="form">
              <label htmlFor="name">Name</label>
              <input name="name" ref={register({ required: true })} />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                type="text"
                ref={register({ required: true })}
              />
              <label htmlFor="store">Store Link</label>
              <input
                name="store"
                type="text"
                ref={register({ required: true })}
              />
              <label htmlFor="tag">Tag</label>
              <select name="tagId" ref={register({ required: true })}>
                {dataTags &&
                  dataTags.tags.map((tag) => (
                    <option key={tag.name} value={tag.id} className="tag">
                      {tag.name}
                    </option>
                  ))}
              </select>
              <div className="tag-container"></div>
            </div>
            <div className="image-upload">Image Upload</div>
          </div>
        </div>
        <div className="panel contribution-detail-container">
          <div className="form">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="number"
              className="short"
              ref={register({ required: true })}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              type="number"
              className="short"
              ref={register()}
            />
          </div>
        </div>
      </form>

      <div className="form-footer">
        <button className="btn cancel small" onClick={onClose}>
          cancel
        </button>
        {section == 1 && (
          <button className="btn" onClick={() => setSection(2)}>
            Next Step
          </button>
        )}
        {section == 2 && (
          <button className="btn" onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        )}
      </div>
    </StyledAddProduct>
  );
};

export default addProduct;
