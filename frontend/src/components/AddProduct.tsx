import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/add.scss'

export default function AddProduct() {
  const [itemType, setItemType] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    //Validation of data existence, and item's price data type
    for (const [key, value] of formData.entries()) {
      if (value == '') {
        setMsg("Please, submit required data");
        return
      }
      switch (key) {
        case "item_price":
          if (isNaN(Number(value)) || Number(value) <= 0) {
            setMsg("Please, provide a valid price.");
            return;
          }
      }
    }

    //Validation of existence of unique properties to add it in formData, and validation for value type
    if (e.currentTarget['item_height'] != undefined) {
      const itemHeight = e.currentTarget['item_height'].value || null;
      const itemWidth = e.currentTarget['item_width'].value || null;
      const itemLength = e.currentTarget['item_length'].value || null;
      const dimensions = `${itemHeight}x${itemWidth}x${itemLength}`;
      if (isNaN(Number(itemHeight)) || isNaN(Number(itemLength)) || isNaN(Number(itemWidth))) {
        setMsg("Please, provide valid dimensions");
        return;
      }
      formData.set("item_feature", dimensions)
    }
    if (e.currentTarget['item_weight'] != undefined) {
      formData.set("item_feature", e.currentTarget['item_weight'].value);
      if (isNaN(Number(e.currentTarget['item_weight'].value))) {
        setMsg("Please, provide valid weight");
        return;
      }

    }
    if (e.currentTarget['item_size'] != undefined) {
      formData.set("item_feature", e.currentTarget['item_size'].value);
      if (isNaN(Number(e.currentTarget['item_size'].value))) {
        setMsg("Please, provide valid size");
        return;
      }
    }

    //request
    try {
      const res: Response = await fetch("https://demo-backend-vercel.fly.dev/api/", {
        method: "POST",
        body: formData,
      });
      const info = await res.json();
      console.log(info)
      setMsg(info.item_sku + info.item_name + info.item_price + info.item_type);
      if (res.ok) {
        console.log(info);
        if(info.status == 'error'){
          setMsg("Please, use an SKU that does not already exist");
        }else{
          navigate("/");
        }
      }
    } catch (e) {
      console.error(e);
    }

  }
  return (
    <div className="App">
      <form onSubmit={e => { handleSubmit(e); }} id='product_form'>
        <div className="header">
          <h2 className="title">Product List</h2>
          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <Link to="/"><button type="button" className="cancel-btn">Cancel</button></Link>
          </div>
        </div>

        <hr />

        <label className='add_labels'>
          <p>SKU</p>
          <input id='sku' name='item_sku' type="text" />
        </label>
        <label className='add_labels'>
          <p>Name</p>
          <input id='name' name='item_name' />
        </label>
        <label className='add_labels'>
          <p>Price ($)</p>
          <input id='price' name='item_price' />
        </label>

        <label className='add_labels'>
          <p>Item Type</p>
          <select id='productType' defaultValue='none' name='item_type' onChange={(e) => { setItemType(e.target.value) }}>
            <option disabled value="none">None</option>
            <option value="Furniture">Furniture</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
          </select>
        </label>

        {itemType === "Book" && (
          <div className="book-type">
            <label>
              <p>Weight (KG)</p>
              <input id='weight' name='item_weight' />
            </label>
            <p className="description">Please provide the weight of the book in kilograms</p>
          </div>
        )}

        {itemType === "DVD" && (
          <div className="dvd-type">
            <label>
              <p>Size (MB)</p>
              <input id='size' name='item_size' />
            </label>
            <p className="description">Please provide the size in megabytes of the DVD</p>
          </div>
        )}

        {itemType === "Furniture" && (
          <div className="furniture-type">
            <label>
              <p>Height (CM)</p>
              <input id='height' name='item_height' />
            </label>
            <label>
              <p>Width (CM)</p>
              <input id='width' name='item_width' />
            </label>
            <label>
              <p>Length (CM)</p>
              <input id='length' name='item_length' />
            </label>
            <p className="description">Please provide the dimensions in HxWxL format</p>
          </div>
        )}
      </form>

      <p>{msg}</p>
    </div>
  );
}

