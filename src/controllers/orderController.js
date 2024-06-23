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
                .sen('Empty step list')
        } else {
            res.status(200).json(step);
        }

    } catch (error) {
        res.status(500).sen(error);
    }
}

const getStepById = async (req, res) => {
    try {
        const stepId = req.query
        const step = await getStepByIds(stepId);
        if (step == null) {
            return res
                .status(404)
                .sen('Empty step list')
        } else {
            res.status(200).json(step);
        }

    } catch (error) {
        return res
            .status(500)
            .sen(error)
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
                    .sen('Insert step  fail')
            } else {
                return res
                    .status(200)
                    .sen('Insert step successfully')
            }
        } else {
            return res
                .status(400)
                .sen('Description and etimatedTime is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const deleteStepById = async (req, res) => {
    try {
        const { stepId } = req.body
        const check = await deleteStepByIds(stepId);
        if (check == false) {
            return res
                .status(500)
                .sen('Delete step fail')
        } else {
            return res
                .status(200)
                .sen('Delete step successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const updateStepById = async (req, res) => {
    try {
        const { stepId, description, etimatedTime } = req.body
        const check = await updateStepByIds(description, etimatedTime, stepId);
        if (check == false) {
            return res
                .status(500)
                .sen('Update step fail')
        } else {
            return res
                .status(200)
                .sen('Update step successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const getAllOrderProgress = async (req, res) => {
    try {
        const orderProgress = await getAllOrderProgresss();

        if (orderProgress == null) {
            return res
                .status(404)
                .sen('Empty order progress list')
        } else {
            res.status(200).json(orderProgress);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getOrderProgressById = async (req, res) => {
    try {
        const orderProgressId = req.query
        const orderProgress = await getOrderProgressByIds(orderProgressId);
        console.log(orderProgress);
        if (orderProgressId == null) {
            return res
                .status(404)
                .sen('Empty order progress list')
        } else {
            res.status(200).json(orderProgress);
        }

    } catch (error) {
        return res
            .status(500)
            .sen(error)
    }
}

const insertOrderProgress = async (req, res) => {
    try {
        const { img, note, stepId, orderId, date } = req.body
        if (img && note && stepId && orderId && date) {
            const check = await insertOrderProgresss(img, note, stepId, orderId, date);
            if (check == false) {
                return res
                    .status(500)
                    .sen('Insert order progress fail')
            } else {
                return res
                    .status(200)
                    .sen('Insert order progress successfully')
            }
        } else {
            return res
                .status(400)
                .sen('Img, note, stepId, orderId and date is required')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const deleteOrderProgressById = async (req, res) => {
    try {
        const { orderProgressId } = req.body
        const check = await deleteOrderProgressByIds(orderProgressId);
        if (check == false) {
            return res
                .status(500)
                .sen('Delete order progress fail')
        } else {
            return res
                .status(200)
                .sen('Delete order progress successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
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
                .sen('Update order progress fail')
        } else {
            return res
                .status(200)
                .sen('Update order progress successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const getAllOrder = async (req, res) => {
    try {
        const order = await getAllOrders();

        if (order == null) {
            return res
                .status(404)
                .sen('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).sen(error);
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.query
        const order = await getOrderByIds(orderId);
        console.log(order);
        if (order == null) {
            return res
                .status(404)
                .sen('Empty order list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .sen(error)
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
                    .sen('Insert order fail')
            } else {
                return res
                    .status(200)
                    .sen('Insert order successfully')
            }
        } else {
            return res
                .status(400)
                .sen('PaymentMethods, phone, address, orderDetailId, status, userId, description and userName is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.body
        const check = await deleteOrderByIds(orderId);
        if (check == false) {
            return res.json
                .status(500)
                .sen('Delete order fail')
        } else {
            return res
                .status(200)
                .sen('Delete order successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
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
                .sen('Empty order detail list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).sen(error);
    }
}

const getOrderDetailById = async (req, res) => {
    try {
        const orderDetailId = req.query;
        const order = await getOrderDetailByIds(orderDetailId);
        console.log(order);
        if (order == null) {
            return res
                .status(404)
                .sen('Empty order detail list')
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        return res
            .status(500)
            .sen(error)
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
                    .sen('Insert order detail fail')
            } else {
                return res
                    .status(200)
                    .sen('Insert order  detail successfully')
            }
        } else {
            return res
                .status(400)
                .sen('Description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const deleteOrderDetailById = async (req, res) => {
    try {
        const { orderDetailId } = req.body
        const check = await deleteOrderDetailByIds(orderDetailId);
        if (check == false) {
            return res
                .status(500)
                .sen('Delete order detailId fail')
        } else {
            return res
                .status(200)
                .sen('Delete order detailId successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
    }
}

const updateOrderDetailById = async (req, res) => {
    try {
        const { description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId } = req.body
        const check = await updateOrderDetailByIds(description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId);
        if (check == false) {
            return res
                .status(500)
                .sen('Update order detail fail')
        } else {
            return res
                .status(200)
                .sen('Update order detail successfully')
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
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
                    .sen('Insert order detail fail')
            } else {
                return res
                    .status(200)
                    .sen('Insert order  detail successfully')
            }
        } else {
            return res
                .status(400)
                .sen('Description, productId and status is required')
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .sen(error)
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