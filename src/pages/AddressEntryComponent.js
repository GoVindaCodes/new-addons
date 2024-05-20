// import React, { useState } from "react";
// import { Input, Button } from "@windmill/react-ui";

// const AddressEntryComponent = ({ isOpen, onClose, onSubmit, submittedAddress }) => {
//     const [address, setAddress] = useState(submittedAddress || "");
//     const [submitted, setSubmitted] = useState(!!submittedAddress);
//     const [editing, setEditing] = useState(false);

//     const handleAddressChange = (e) => {
//         setAddress(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitting address:", address);
//         onSubmit(address);
//         setSubmitted(true);
//         setEditing(false); // Once submitted, disable editing mode
//     };

//     const handleEdit = () => {
//         setEditing(true); // Enable editing mode
//     };

//     return (
//         <div>
//             <h3 className="text-lg font-semibold mb-4">Address Entry</h3>
//             {!submitted || editing ? (
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <Input type="textarea" value={address} onChange={handleAddressChange} placeholder="Enter Address" />
//                     <Button type="submit">Submit Address</Button>
//                     {/* <Button layout="outline" onClick={onClose}>Close</Button> */}
//                 </form>
//             ) : (
//                 <div>
//                     <p>Submitted Address: {address}</p>
//                     <Button onClick={handleEdit}>Edit Address</Button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddressEntryComponent;



import React, { useState } from "react";
import { Input, Button } from "@windmill/react-ui";
import ProductServices from "services/ProductServices";

const AddressEntryComponent = ({ id, isOpen, onClose, onSubmit, submittedAddress }) => {
    const [address, setAddress] = useState(submittedAddress || "");
    const [submitted, setSubmitted] = useState(!!submittedAddress);
    const [editing, setEditing] = useState(false);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting address:", address);
        try {
            await ProductServices.addAddress(address, id);
            onSubmit(address);
            setSubmitted(true);
            setEditing(false);
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };

    const handleEdit = () => {
        setEditing(true); // Enable editing mode
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Address Entry</h3>
            {!submitted || editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input type="textarea" value={address} onChange={handleAddressChange} placeholder="Enter Address" />
                    <Button type="submit">Submit Address</Button>
                </form>
            ) : (
                <div>
                    <p>Submitted Address: {address}</p>
                    <Button onClick={handleEdit}>Edit Address</Button>
                </div>
            )}
        </div>
    );
};

export default AddressEntryComponent;
