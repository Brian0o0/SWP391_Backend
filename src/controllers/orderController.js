//Order functionality handles receiving and sending data from the database to the user
const { getAllSteps, getStepByIds, insertSteps, updateStepByIds, deleteStepByIds,
    getAllOrderProgresss, getOrderProgressByIds, insertOrderProgresss, deleteOrderProgressByIds, updateOrderProgressByIds,
    getAllOrders, getOrderByIds, insertOrders, updateOrderByIds, deleteOrderByIds,
    getAllOrderDetails, getOrderDetailByIds, insertOrderDetails, updateOrderDetailByIds, deleteOrderDetailByIds
} = require('../services/orderServices');

const getAllStep = async (req, res) => {
    try {
        const step = await getAllSteps();

        if (step == null) {
            return res.json({
                status: 'err',
                message: 'Empty step list'
            });
        } else {
            res.json(step);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getStepById = async (req, res) => {
    try {
        const { stepId } = req.body
        const step = await getStepByIds(stepId);
        console.log(step);
        if (step == null) {
            return res.json({
                status: 'err',
                message: 'Empty step list'
            });
        } else {
            res.json(step);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertStep = async (req, res) => {
    try {
        const { description, etimatedTime } = req.body
        if (description && etimatedTime) {
            const check = await insertSteps(description, etimatedTime);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert step  fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert step successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Description and etimatedTime is required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteStepById = async (req, res) => {
    try {
        const { stepId } = req.body
        const check = await deleteStepByIds(stepId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete step fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete step successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const updateStepById = async (req, res) => {
    try {
        const { stepId, description, etimatedTime } = req.body
        const check = await updateStepByIds(description, etimatedTime, stepId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update step fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update step successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const getAllOrderProgress = async (req, res) => {
    try {
        const orderProgress = await getAllOrderProgresss();

        if (orderProgress == null) {
            return res.json({
                status: 'err',
                message: 'Empty order progress list'
            });
        } else {
            res.json(orderProgress);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getOrderProgressById = async (req, res) => {
    try {
        const { orderProgressId } = req.body
        const orderProgress = await getOrderProgressByIds(orderProgressId);
        console.log(orderProgress);
        if (orderProgressId == null) {
            return res.json({
                status: 'err',
                message: 'Empty order progress list'
            });
        } else {
            res.json(orderProgress);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertOrderProgress = async (req, res) => {
    try {
        const { img, note, stepId, orderId, date } = req.body
        if (img && note && stepId && orderId && date) {
            const check = await insertOrderProgresss(img, note, stepId, orderId, date);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert order progress fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert order progress successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Img, note, stepId, orderId and date is required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteOrderProgressById = async (req, res) => {
    try {
        const { orderProgressId } = req.body
        const check = await deleteOrderProgressByIds(orderProgressId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete order progress fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete  order progress successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const updateOrderProgressById = async (req, res) => {
    try {
        const { img, note, stepId, orderId, date, orderProgressId } = req.body
        const check = await updateOrderProgressByIds(img, note, stepId, orderId, date, orderProgressId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update step fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update step successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const order = await getAllOrders();

        if (order == null) {
            return res.json({
                status: 'err',
                message: 'Empty order list'
            });
        } else {
            res.json(order);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await getOrderByIds(orderId);
        console.log(order);
        if (order == null) {
            return res.json({
                status: 'err',
                message: 'Empty order list'
            });
        } else {
            res.json(order);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertOrder = async (req, res) => {
    try {
        const { paymentMethods, phone, address, orderDetailId, status, userId, description, userName } = req.body
        if (paymentMethods && phone && address && orderDetailId && status && userId && description && userName) {
            const check = await insertOrders(paymentMethods, phone, address, orderDetailId, status, userId, description, userName);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert order fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert order successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'PaymentMethods, phone, address, orderDetailId, status, userId, description and userName is required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.body
        const check = await deleteOrderByIds(orderId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete order fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete order successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const updateOrderById = async (req, res) => {
    try {
        const { paymentMethods, phone, address, orderDetailId, status, userId, description, userName, orderId } = req.body
        const check = await updateOrderByIds(paymentMethods, phone, address, orderDetailId, status, userId, description, userName, orderId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update order fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update order successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const getAllOrderDetail = async (req, res) => {
    try {
        const order = await getAllOrderDetails();

        if (order == null) {
            return res.json({
                status: 'err',
                message: 'Empty order detail list'
            });
        } else {
            res.json(order);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const getOrderDetailById = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await getOrderDetailByIds(orderDetailId);
        console.log(order);
        if (order == null) {
            return res.json({
                status: 'err',
                message: 'Empty order detail list'
            });
        } else {
            res.json(order);
        }

    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
}

const insertOrderDetail = async (req, res) => {
    try {
        const { description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId } = req.body
        if (description && productId && status && productName && categoryId && categoryName && materialId && materialName && gemId && gemName && quantityGem && quantityMaterial && orderDate && orderId) {

            const check = await insertOrderDetails(description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId);
            if (check == false) {
                return res.json({
                    status: 'error',
                    message: 'Insert order detail fail'
                });
            } else {
                return res.json({
                    status: 'success',
                    message: 'Insert order  detail successfully'
                });
            }
        } else {
            return res.json({
                status: 'err',
                message: 'Description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate and orderId is required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteOrderDetailById = async (req, res) => {
    try {
        const { orderId } = req.body
        const check = await deleteOrderDetailByIds(orderDetailId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Delete order detailId fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Delete order detailId successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
    }
}

const updateOrderDetailById = async (req, res) => {
    try {
        const { description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId } = req.body
        const check = await updateOrderDetailByIds(description, productId, status, productName, categoryId, categoryName, materialId, materialName, gemId, gemName, quantityGem, quantityMaterial, orderDate, orderId, orderDetailId);
        if (check == false) {
            return res.json({
                status: 'error',
                message: 'Update order detail fail'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Update order detail successfully'
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: error.message
        })
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
    insertOrderDetail,
    updateOrderDetailById,
    deleteOrderDetailById,
}