//Order functionality handles receiving and sending data from the database to the user
const { getAllSteps, getStepByIds, insertSteps, updateStepByIds, deleteStepByIds,
    getAllOrderProgresss, getOrderProgressByIds, insertOrderProgresss, deleteOrderProgressByIds, updateOrderProgressByIds,
    getAllOrders, getOrderByIds, insertOrders, updateOrderByIds, deleteOrderByIds,
    getAllOrderDetails, getOrderDetailByIds, insertOrderDetails, updateOrderDetailByIds, deleteOrderDetailByIds, insertOrderDetailServices
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
        res.status(500).send(error);
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
            .send(error)
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
            .send(error)
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
            .send(error)
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
            .send(error)
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
        res.status(500).json(error);
    }
}

const getOrderProgressById = async (req, res) => {
    try {
        const orderProgressId = req.query.OrderProgressId;
        const orderProgress = await getOrderProgressByIds(orderProgressId);
        if (orderProgress.length <= 0) {
            return res
                .status(404)
                .sen('Order progress not found')
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
            .send(error)
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
            .send(error)
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
            .send(error)
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
        res.status(500).send(error);
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
                .d('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error)
    }
}

const insertOrder = async (req, res) => {
    try {
        const { PaymentMethods, Phone, Address, Status, UserId, Description, UserName } = req.body
        if (PaymentMethods && Phone && Address && Status && UserId && Description && UserName) {
            const check = await insertOrders(PaymentMethods, Phone, Address, Status, UserId, Description, UserName);
            if (check == false) {
                return res
                    .status(500)
                    .send('Insert order fail')
            } else {
                return res
                    .status(200)
                    .send('Insert order successfully')
            }
        } else {
            return res
                .status(400)
                .sen('paymentMethods, phone, address, status, userId, description and userName is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
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
            .send(error)
    }
}

const updateOrderById = async (req, res) => {
    try {
        const { PaymentMethods, Phone, Address, OrderDetailId, Status, UserId, Description, UserName, OrderId } = req.body
        const check = await updateOrderByIds(PaymentMethods, Phone, Address, OrderDetailId, Status, UserId, Description, UserName, OrderId);
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
            .send(error)
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
        res.status(500).send(error);
    }
}

const getOrderDetailById = async (req, res) => {
    try {
        const orderDetailId = req.query.OrderDetailId;
        const orderDetail = await getOrderDetailByIds(orderDetailId);
        if (orderDetail.length <= 0) {
            return res
                .status(404)
                .sen('Order detail not found')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .send(error)
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
                .sen('description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
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
            .send(error)
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
            .send(error)
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
                .sen('Description, productId, status and orderId is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(error)
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
}