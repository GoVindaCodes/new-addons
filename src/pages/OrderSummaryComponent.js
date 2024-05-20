import React, { useEffect, useState } from "react";
import useAsync from "hooks/useAsync";
import ProductServices from "services/ProductServices";

const OrderSummaryComponent = ({ id, address, selectedPaymentMethod }) => {
    const { data, loading } = useAsync(() => ProductServices.getProductById(id));
    // const { datas } = useAsync(() => ProductServices.getProductById(id));
    console.log("hi datas", data)
    // Function to update the order with selected payment method type and address
    // const updateOrder = async () => {
    //     try {
    //         // Make an API call to update the order
    //         await ProductServices.updateOrder(id, { address, selectedPaymentMethod });
    //     } catch (error) {
    //         console.error("Error updating order:", error);
    //     }
    // };

    // const [paymentMethod, setPaymentMethod] = useState(null);

    // useEffect(() => {
    //     const fetchPaymentMethod = async () => {
    //         try {
    //             const method = await ProductServices.getPaymentMethodByProductId(id);
    //             console.log("Fetched payment method:", method);
    //             setPaymentMethod(method);
    //         } catch (error) {
    //             console.error("Error fetching payment method:", error);
    //         }
    //     };

    //     fetchPaymentMethod();
    // }, [id]);
    const getLatestSelectedPaymentMethod = () => {
        // Assuming paymentMethods are sorted in descending order of selection time
        const paymentMethods = data?.paymentMethods || [];
        const lastIndex = paymentMethods.length - 1;
        return paymentMethods[lastIndex];
    };
    const latestSelectedPaymentMethod = getLatestSelectedPaymentMethod();

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
                <div>
                    <span className="font-medium">Product:</span>{" "}
                    <span>{data?.title || "N/A"}</span>
                </div>
                <div>
                    <span className="font-medium">Shipping Address:</span>{" "}
                    <span>{address}</span>
                </div>
                <div>
                    <span className="font-medium">Selected Payment Method:</span>{" "}
                    <span>{latestSelectedPaymentMethod ? latestSelectedPaymentMethod.type : "N/A"}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryComponent;
