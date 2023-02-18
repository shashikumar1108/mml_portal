
const reply = (req, res, data) => {
    return res.status(200).send(data);
}

module.exports = {
    reply
}