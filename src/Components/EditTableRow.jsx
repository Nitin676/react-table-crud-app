import React from "react";
// import { nanoid } from "nanoid";

const EditTableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  // destructing data here
  // const [nid, setNid] = useState(nanoid);

  // Also use useEffect to get data :
  // useEffect(() => {
  //   console.log("useEffect Id", editFormData);
  // }, [editFormData]);

  return (
    <>
      <tr>
        {/* <td className="text-center">
          <b>{nid}</b>
        </td> */}
        <td>
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Name"
            value={editFormData.name}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            name="phone"
            className="form-control"
            type="text"
            placeholder="Phone"
            value={editFormData.phone}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            name="email"
            className="form-control"
            type="email"
            placeholder="Email"
            value={editFormData.email}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            name="street"
            className="form-control"
            type="text"
            placeholder="Street"
            value={editFormData.street}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            name="city"
            className="form-control"
            type="text"
            placeholder="City"
            value={editFormData.city}
            onChange={handleEditFormChange} 
          />
        </td>
        <td>
          <button type="submit" className="btn btn-warning">Save</button>
          <button type="button" className="btn btn-primary ms-3" onClick={handleCancelClick}>
            Cancel
          </button>
        </td>
      </tr>
    </>
  );
};

export default EditTableRow;
