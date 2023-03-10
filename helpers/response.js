
const reply = (req, res, data) => {
    return res.status(200).send(data);
}

const replyMsg = (req, res, message) => {
    return res.status(200).send({message: message});
}

const tokenError = (req, res, error) => {
    let response = {
      error: error
    };
    return res.status(404).send(response);
};

const clientErrorMsg = (req, res, message) => {
  let response = {
    message: message
  };

  return res.status(400).send(response);
};

const serverError = (req, res, error) => {
  let response = {
    error: error
  };
  logger.error(error);
  return res.status(500).send(response);
};

const clientError = (req, res, message) => {
  let response = {
    message: message
  };

  return res.status(400).send(response);
};

module.exports = {
    reply,
    replyMsg,
    tokenError,
    clientError,
    clientErrorMsg,
    serverError
}