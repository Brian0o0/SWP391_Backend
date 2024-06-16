
const { getUserByIds } = require('../services/userServices')

const loginSuccess = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            res
                .status(400)
                .send('Missing Id!!!')
        }
        let user = await getUserByIds(id);
        res.status(200).json(user);
    } catch (error) {
        res
            .status(500)
            .send('Fail at auth controller' + error)
    }
}


module.exports = {
    loginSuccess,
}