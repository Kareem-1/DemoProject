import React, { useState } from 'react';
import '../sass.scss'


export default function AddProduct() {
  const [itemType, setItemType] = useState<string>('');
  const [msg, setMsg] = useState<string>('');



  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("item_sku", e.currentTarget['item_sku'].value);
    formData.append("item_name", e.currentTarget['item_name'].value);
    formData.append("item_price", e.currentTarget['item_price'].value);
    formData.append("item_type", e.currentTarget['item_type'].value);
    if (e.currentTarget['item_height'] != undefined) {
      const itemHeight = e.currentTarget['item_height'].value || null;
      const itemWidth = e.currentTarget['item_width'].value || null;
      const itemLength = e.currentTarget['item_length'].value || null;
      const dimensions = `${itemHeight}x${itemWidth}x${itemLength}`;
      formData.append("item_feature", dimensions)
    } else {
      formData.append("item_feature", e.currentTarget['item_feature'].value);
    }
    try {
      const res: Response = await fetch("http://localhost:80/demoproject/backend/", {
        method:"POST",
        body: formData,
      });

      //setMsg(data.item_name + data.item_price + data.item_sku);
      const info = await res.json();
      console.log(info)
      setMsg(info.item_sku + info.item_name + info.item_price + info.item_type)
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="App">
      <h2 className='title'>Product Add</h2>
      <hr />
      <form onSubmit={(e) => { handleClick(e) }} method='POST' id='product_form'>
        <label className='add_labels'>
          <p>SKU</p>
          <input required name='item_sku' id='item_sku' type="text" />
        </label>
        <label className='add_labels'>
          <p>Name</p>
          <input required name='item_name' id='item_name' />
        </label>
        <label className='add_labels'>
          <p>Price</p>
          <input required name='item_price' id='item_price' />
        </label>
        <label className='add_labels'>
          <p>Item Type</p>
          <select required defaultValue='none' name='item_type' id='item_type' onChange={(e) => { setItemType(e.target.value) }}>
            <option disabled value="none">None</option>
            <option value="Furniture">Furniture</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
          </select>
        </label>
        {
          itemType == "Book" &&
          <div>
            <label>
              <p>Weight</p>
              <input required type='number' name='item_feature' id='item_feature' />
            </label>
          </div>
        }
        {
          itemType == "DVD" &&
          <div>
            <label>
              <p>Size</p>
              <input required type='number' name='item_feature' id='item_feature' />
            </label>
          </div>
        }
        {
          itemType == "Furniture" &&
          <div>
            <label>
              <p>Height</p>
              <input type='number' name='item_height' id='item_height' />
            </label>
            <label>
              <p>Width</p>
              <input type='number' name='item_width' id='item_width' />
            </label>
            <label>
              <p>Length</p>
              <input type='number' name='item_length' id='item_length' />
            </label>
          </div>
        }
        <label className='add_labels'>
          <button type="submit">Submit</button>
        </label>
      </form>
      <p>{msg}</p>
    </div>
  );
}

