import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function ProductList() {
    const [data, setData] = useState<any[]>([]);
    const [checkedData, setCheckedData] = useState<any[]>([]);
    const [sendData, setSendData] = useState<any[]>([]);
    const getItems = async () => {
        try {
            let res = await fetch('http://localhost:80/demoproject/backend/')
                .then(async (info) => { let data = await info.json(); setData(data.data); })
            //.then(results => setData(results));
            // console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        checkedData.map((d) => {
            let quotedData = `"${d}"`;
            setSendData([...sendData, quotedData]);
        })
    }, [checkedData])
    const handleDelete = async () => {
        console.log(checkedData);

        console.log(sendData);
        try {
            let res = await fetch('http://localhost:80/demoproject/backend/', {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(sendData)
            })
            let info = await res.json();
            console.log(info);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getItems();
        // console.log(data);
    }, [])
    return (
        <div>
            <div>
                <p>Product List</p>
                <div>
                    <Link to="add-product"><button>ADD</button></Link>
                    <button onClick={() => { handleDelete() }}>MASS DELETE</button>
                </div>
            </div>
            <div className="product_list">
                {data.map((info) => {
                    let uniqueItem: string = "";
                    let type: string = "";
                    if (info.size != null) {
                        uniqueItem = info.size;
                        type = 'Size';
                    }
                    if (info.weight != null) {
                        uniqueItem = info.weight;
                        type = "Weight";
                    }
                    if (info.dimensions != null) {
                        uniqueItem = info.dimensions;
                        type = "Dimensions";
                    }
                    return (
                        <div className="product_items" key={info.id}>
                            <input type="checkbox" className="delete-checkbox" onClick={(e) => { setCheckedData([...checkedData, info.id]); }} />
                            <p>Item SKU: {info.id}</p>
                            <p>Item Name: {info.name}</p>
                            <p>Item Price: {info.price}</p>
                            <p>{type}: {uniqueItem}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}