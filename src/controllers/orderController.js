//Order functionality handles receiving and sending data from the database to the user
const { getAllSteps, getStepByIds, insertSteps, updateStepByIds, deleteStepByIds,
    getAllOrderProgresss, getOrderProgressByIds, insertOrderProgresss, deleteOrderProgressByIds, updateOrderProgressByIds,
    getAllOrders, getOrderByIds, insertOrders, updateOrderByIds, deleteOrderByIds,
    getAllOrderDetails, getOrderDetailByIds, insertOrderDetails, updateOrderDetailByIds, deleteOrderDetailByIds, insertOrderDetailServices,
    checkOuts, orderRequests, getTotalOrders, getTotalOrderDetailByMonths, getTotalOrderDetails, getTotalAmountOrderDetails, getTotalAmountOrderDetailByMonths,
    getTotalOrderDetailAllMonths, getTotalAmountOrderDetailAllMonths, getOrderByUserIds, getOrderByStatuss, getOrderDetailByOrderIds, updateStatusOrderDetailByIds,
    updateOrderStatus, getTotalAmountOrders
} = require('../services/orderServices');

const getAllStep = async (req, res) => {
    try {
        const step = await getAllSteps();

        if (step.length <= 0) {
            return res
                .status(404)
                .send('Empty step list')
        } else {
            res.status(200).json(step);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getStepById = async (req, res) => {
    try {
        const stepId = req.query.StepId;
        const step = await getStepByIds(stepId);
        if (step.length <= 0) {
            return res
                .status(404)
                .send('Step not found!!!')
        } else {
            res.status(200).json(step);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const insertStep = async (req, res) => {
    try {
        const { Description, EtimatedTime } = req.body
        if (Description && EtimatedTime) {
            const check = await insertSteps(Description, EtimatedTime);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert step  fail')
            } else {
                return res
                    .status(200)
                    .send('Insert step successfully')
            }
        } else {
            return res
                .status(400)
                .send('Description and etimatedTime is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const deleteStepById = async (req, res) => {
    try {
        const { StepId } = req.body
        const check = await deleteStepByIds(StepId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete step fail')
        } else {
            return res
                .status(200)
                .send('Delete step successfull')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateStepById = async (req, res) => {
    try {
        const { StepId, Description, EtimatedTime } = req.body
        const check = await updateStepByIds(Description, EtimatedTime, StepId);
        if (check == false) {
            return res
                .status(500)
                .send('Update step fail')
        } else {
            return res
                .status(200)
                .send('Update step successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const getAllOrderProgress = async (req, res) => {
    try {
        const orderProgress = await getAllOrderProgresss();
        if (orderProgress.length <= 0) {
            return res
                .status(404)
                .send('Empty order progress list')
        } else {
            res.status(200).json(orderProgress);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getOrderProgressById = async (req, res) => {
    try {
        const orderProgressId = req.query.OrderProgressId;
        const orderProgress = await getOrderProgressByIds(orderProgressId);
        if (orderProgress.length <= 0) {
            return res
                .status(404)
                .send('Order progress not found')
        } else {
            res.status(200).json(orderProgress);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error)
    }
}

const insertOrderProgress = async (req, res) => {
    try {
        const { Image, Note, StepId, OrderId, Date } = req.body
        if (Image && Note && StepId && OrderId && Date) {
            const check = await insertOrderProgresss(Image, Note, StepId, OrderId, Date);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert order progress fail')
            } else {
                return res
                    .status(200)
                    .send('Insert order progress successfully')
            }
        } else {
            return res
                .status(400)
                .send('Img, note, stepId, orderId and date is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const deleteOrderProgressById = async (req, res) => {
    try {
        const { OrderProgressId } = req.body
        const check = await deleteOrderProgressByIds(OrderProgressId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete order progress fail')
        } else {
            return res
                .status(200)
                .send('Delete order progress successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateOrderProgressById = async (req, res) => {
    try {
        const { Image, Note, StepId, OrderId, Date, OrderProgressId } = req.body
        const check = await updateOrderProgressByIds(Image, Note, StepId, OrderId, Date, OrderProgressId);
        console.log(check);
        if (check == false) {
            return res
                .status(500)
                .send('Update order progress fail')
        } else {
            return res
                .status(200)
                .send('Update order progress successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const getAllOrder = async (req, res) => {
    try {
        const orders = await getAllOrders();
        if (orders.length <= 0) {
            return res
                .status(404)
                .send('Empty order list')
        } else {
            res.status(200).json(orders);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.query.OrderId;
        const order = await getOrderByIds(orderId);
        console.log(order);
        if (order.length <= 0) {
            return res
                .status(404)
                .send('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.query.UserId;
        const order = await getOrderByUserIds(userId);
        if (order.length <= 0) {
            return res
                .status(404)
                .send('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getOrderByStatus = async (req, res) => {
    try {
        const status = req.query.Status;
        const order = await getOrderByStatuss(status);
        if (order.length <= 0) {
            return res
                .status(404)
                .send('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const insertOrder = async (req, res) => {
    try {
        const { PaymentMethods, Phone, Address, Status, UserId, Description, Name, ProductIds } = req.body
        console.log(req.body)
        if (PaymentMethods && Phone && Address && Status && UserId && Description && Name && ProductIds) {
            const check = await checkOuts(PaymentMethods, Phone, Address, Status, UserId, Description, Name, ProductIds);
            if (check.length <= 0) {
                return res
                    .status(500)
                    .send('Insert order fail')
            } else {
                return res
                    .status(200)
                    .json(check)
            }
        } else {
            return res
                .status(400)
                .send('paymentMethods, phone, address, status, userId, description and userName is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const { OrderId } = req.body
        const check = await deleteOrderByIds(OrderId);
        if (check == false) {
            return res.json
                .status(500)
                .send('Delete order fail')
        } else {
            return res
                .status(200)
                .send('Delete order successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateOrderById = async (req, res) => {
    try {
        const { PaymentMethods, Phone, Address, Status, UserId, Description, Name, OrderId } = req.body
        const check = await updateOrderByIds(PaymentMethods, Phone, Address, Status, UserId, Description, Name, OrderId);
        if (check == false) {
            return res
                .status(500)
                .send('Update order fail')
        } else {
            return res
                .status(200)
                .send('Update order successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateStatusOrdeById = async (req, res) => {
    try {
        const { Status, OrderId } = req.body
        const check = await updateOrderStatus(Status, OrderId);
        if (check == false) {
            return res
                .status(500)
                .send('Update status order fail')
        } else {
            return res
                .status(200)
                .send('Update status order successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const getAllOrderDetail = async (req, res) => {
    try {
        const orderDetails = await getAllOrderDetails();

        if (orderDetails.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(orderDetails);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getOrderDetailById = async (req, res) => {
    try {
        const orderDetailId = req.query.OrderDetailId;
        const orderDetail = await getOrderDetailByIds(orderDetailId);
        if (orderDetail.length <= 0) {
            return res
                .status(404)
                .send('Order detail not found')
        } else {
            res.status(200).json(orderDetail);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const getOrderDetailByOrderId = async (req, res) => {
    try {
        const orderId = req.query.OrderId;
        const orderDetail = await getOrderDetailByOrderIds(orderId);
        if (orderDetail.length <= 0) {
            return res
                .status(404)
                .send('Order detail not found')
        } else {
            res.status(200).json(orderDetail);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error.message)
    }
}

const insertOrderDetailTemp = async (req, res) => {
    try {
        const { Description, ProductId, Status, ProductName, CategoryId, CategoryName, MaterialId, MaterialName, GemId, GemName, QuantityGem, QuantityMaterial, OrderDate, OrderId } = req.body
        if (Description && ProductId && Status && ProductName && CategoryId && CategoryName && MaterialId && MaterialName && GemId && GemName && QuantityGem && QuantityMaterial && OrderDate && OrderId) {

            const check = await insertOrderDetails(Description, ProductId, Status, ProductName, CategoryId, CategoryName, MaterialId, MaterialName, GemId, GemName, QuantityGem, QuantityMaterial, OrderDate, OrderId);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert order detail fail')
            } else {
                return res
                    .status(200)
                    .send('Insert order  detail successfully')
            }
        } else {
            return res
                .status(400)
                .send('description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const deleteOrderDetailById = async (req, res) => {
    try {
        const { OrderDetailId } = req.body
        const check = await deleteOrderDetailByIds(OrderDetailId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete order detailId fail')
        } else {
            return res
                .status(200)
                .send('Delete order detailId successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateOrderDetailById = async (req, res) => {
    try {
        const { Description, ProductId, Status, ProductName, CategoryId, CategoryName, MaterialId, MaterialName, GemId, GemName, QuantityGem, QuantityMaterial, OrderDate, OrderId, OrderDetailId } = req.body
        const check = await updateOrderDetailByIds(Description, ProductId, Status, ProductName, CategoryId, CategoryName, MaterialId, MaterialName, GemId, GemName, QuantityGem, QuantityMaterial, OrderDate, OrderId, OrderDetailId);
        if (check == false) {
            return res
                .status(500)
                .send('Update order detail fail')
        } else {
            return res
                .status(200)
                .send('Update order detail successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const updateStatusOrderDetailById = async (req, res) => {
    try {
        const { Status, OrderDetailId } = req.body
        const check = await updateStatusOrderDetailByIds(Status, OrderDetailId);
        if (check == false) {
            return res
                .status(500)
                .send('Update status order detail fail')
        } else {
            return res
                .status(200)
                .send('Update status order detail successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const insertOrderDetail = async (req, res) => {
    try {
        const { Description, ProductId, Status, OrderId } = req.body
        if (Description && ProductId && Status) {

            const check = await insertOrderDetailServices(Description, ProductId, Status, OrderId);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert order detail fail')
            } else {
                return res
                    .status(200)
                    .send('Insert order  detail successfully')
            }
        } else {
            return res
                .status(400)
                .send('Description, productId, status and orderId is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const getTotalOrder = async (req, res) => {
    try {
        const totalOrder = await getTotalOrders();

        if (totalOrder.length <= 0) {
            return res
                .status(404)
                .send('Empty order list')
        } else {
            res.status(200).json(totalOrder);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const orderRequest = async (req, res) => {
    try {
        const { PaymentMethods, Phone, Address, Status, UserId, Description, UserName, ProductName, MaterialId, GemId, CategoryId, ProductCost, Image, QuantityGem, Size, WarrantyCard, Productdescription, QuantityMaterial } = req.body
        if (PaymentMethods && Phone && Address && Status && UserId && Description && UserName && ProductName && MaterialId && GemId && CategoryId && ProductCost && Image && QuantityGem && Size && WarrantyCard && Productdescription && QuantityMaterial) {
            const check = await orderRequests(PaymentMethods, Phone, Address, Status, UserId, Description, UserName, ProductName, MaterialId, GemId, CategoryId, ProductCost, Image, QuantityGem, Size, WarrantyCard, Productdescription, QuantityMaterial);
            if (check.length <= 0) {
                return res
                    .status(500)
                    .send('Create order request fail')
            } else {
                return res
                    .status(200)
                    .json(check)
            }
        } else {
            return res
                .status(400)
                .send('PaymentMethods, Phone, address, status, userId, description, userName, productName, materialId, gemId, categoryId, productCost, image, quantityGem, size, warrantyCard, productdescription and quantityMaterial  is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error.message)
    }
}

const getTotalOrderDetail = async (req, res) => {
    try {
        const totalOrderDetail = await getTotalOrderDetails();

        if (totalOrderDetail.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(totalOrderDetail);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTotalOrderDetailByMonth = async (req, res) => {
    try {
        const month = req.query.Month;
        const year = req.query.Year;
        const totalOrder = await getTotalOrderDetailByMonths(month, year);
        if (totalOrder.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(totalOrder);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTotalOrderDetailAllMonth = async (req, res) => {
    try {
        const year = req.query.Year
        const totalOrder = await getTotalOrderDetailAllMonths(year);
        if (totalOrder.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(totalOrder);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTotalAmountOrderDetail = async (req, res) => {
    try {
        const totalAmountOrderDetail = await getTotalAmountOrderDetails();

        if (totalAmountOrderDetail.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(totalAmountOrderDetail);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTotalAmountOrderDetailByMonth = async (req, res) => {
    try {
        const month = req.query.Month;
        const year = req.query.Year;
        const totalAmountOrderDetail = await getTotalAmountOrderDetailByMonths(month, year);

        if (totalAmountOrderDetail.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(totalAmountOrderDetail);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTotalAmountOrderDetailAllMonth = async (req, res) => {
    try {
        const year = req.query.Year
        const totalOrder = await getTotalAmountOrderDetailAllMonths(year);
        if (totalOrder.length <= 0) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(totalOrder);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTotalAmountOrder = async (req, res) => {
    try {
        const orderId = req.query.OrderId
        const totalOrder = await getTotalAmountOrders(orderId);
        if (totalOrder.length <= 0) {
            return res
                .status(404)
                .send('Order is not exits')
        } else {
            res.status(200).json(totalOrder);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllStep,
    getStepById,
    insertStep,
    deleteStepById,
    updateStepById,
    getAllOrderProgress,
    getOrderProgressById,
    insertOrderProgress,
    deleteOrderProgressById,
    updateOrderProgressById,
    getAllOrder,
    getOrderById,
    insertOrder,
    deleteOrderById,
    updateOrderById,
    getAllOrderDetail,
    getOrderDetailById,
    insertOrderDetailTemp,
    updateOrderDetailById,
    deleteOrderDetailById,
    insertOrderDetail,
    getTotalOrder,
    getTotalOrderDetailByMonth,
    getTotalOrderDetail,
    getTotalAmountOrderDetailByMonth,
    getTotalAmountOrderDetail,
    orderRequest,
    getTotalOrderDetailAllMonth,
    getTotalAmountOrderDetailAllMonth,
    getOrderByUserId,
    getOrderByStatus,
    getOrderDetailByOrderId,
    updateStatusOrderDetailById,
    updateStatusOrdeById,
    getTotalAmountOrder
}