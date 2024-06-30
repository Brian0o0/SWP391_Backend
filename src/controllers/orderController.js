//Order functionality handles receiving and sending data from the database to the user
const { getAllSteps, getStepByIds, insertSteps, updateStepByIds, deleteStepByIds,
    getAllOrderProgresss, getOrderProgressByIds, insertOrderProgresss, deleteOrderProgressByIds, updateOrderProgressByIds,
    getAllOrders, getOrderByIds, insertOrders, updateOrderByIds, deleteOrderByIds,
    getAllOrderDetails, getOrderDetailByIds, insertOrderDetails, updateOrderDetailByIds, deleteOrderDetailByIds, insertOrderDetailServices
} = require('../services/orderServices');

const getAllStep = async (req, res) => {
    try {
        const step = await getAllSteps();

        if (step == null) {
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
        const stepId = req.query.stepId;
        const step = await getStepByIds(stepId);
        if (step == null) {
            return res
                .status(404)
                .send('Empty step list')
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
        const { description, etimatedTime } = req.body
        if (description && etimatedTime) {
            const check = await insertSteps(description, etimatedTime);
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
        const { stepId } = req.body
        const check = await deleteStepByIds(stepId);
        if (check == false) {
            return res
                .status(500)
                .send('Delete step fail')
        } else {
            return res
                .status(200)
                .send('Delete step successfully')
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
        const { stepId, description, etimatedTime } = req.body
        const check = await updateStepByIds(description, etimatedTime, stepId);
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

        if (orderProgress == null) {
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
        const orderProgressId = req.query.orderProgressId;
        const orderProgress = await getOrderProgressByIds(orderProgressId);
        console.log(orderProgress);
        if (orderProgressId == null) {
            return res
                .status(404)
                .send('Empty order progress list')
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
        const { img, note, stepId, orderId, date } = req.body
        if (img && note && stepId && orderId && date) {
            const imgBuffer = Buffer.from(img, 'base64');
            const check = await insertOrderProgresss(imgBuffer, note, stepId, orderId, date);
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
        const { orderProgressId } = req.body
        const check = await deleteOrderProgressByIds(orderProgressId);
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
        const { img, note, stepId, orderId, date, orderProgressId } = req.body
        const check = await updateOrderProgressByIds(img, note, stepId, orderId, date, orderProgressId);
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
        const order = await getAllOrders();

        if (order == null) {
            return res
                .status(404)
                .send('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        const order = await getOrderByIds(orderId);
        console.log(order);
        if (order == null) {
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
        const { paymentMethods, phone, address, orderDetailId, status, userId, description, userName } = req.body
        if (paymentMethods && phone && address && orderDetailId && status && userId && description && userName) {
            const check = await insertOrders(paymentMethods, phone, address, orderDetailId, status, userId, description, userName);
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
                .send('PaymentMethods, phone, address, orderDetailId, status, userId, description and userName is required')
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
        const { orderId } = req.body
        const check = await deleteOrderByIds(orderId);
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
        const { paymentMethods, phone, address, orderDetailId, status, userId, description, userName, orderId } = req.body
        console.log(status);
        console.log(orderId);
        const check = await updateOrderByIds(paymentMethods, phone, address, orderDetailId, status, userId, description, userName, orderId);
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
        const order = await getAllOrderDetails();

        if (order == null) {
            return res
                .status(404)
                .send('Empty order detail list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const getOrderDetailById = async (req, res) => {
    try {
        const orderDetailId = req.query.orderDetailId;
        const order = await getOrderDetailByIds(orderDetailId);
        console.log(order);
        if (order == null) {
            return res
                .status(404)
                .send('Empty order detail list')
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
        const { description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate } = req.body
        if (description && productId && status && productName && categoryId && categoryName && materialId && materialName && gemId && gemName && quantityGem && quantityMaterial && orderDate) {

            const check = await insertOrderDetails(description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate);
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
                .send('Description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required')
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
        const { orderDetailId } = req.body
        const check = await deleteOrderDetailByIds(orderDetailId);
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
        const { description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId } = req.body
        const check = await updateOrderDetailByIds(description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId);
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
        const { description, productId, status } = req.body
        if (description && productId && status) {

            const check = await insertOrderDetailServices(description, productId, status);
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
                .send('Description, productId and status is required')
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