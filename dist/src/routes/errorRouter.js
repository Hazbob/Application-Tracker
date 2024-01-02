"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorRouter(error, req, res, next) {
    if (error.message === "No applications found") {
        res.status(404).send({ message: error.message });
    }
    else if (error.message === "Error adding new application") {
        res.status(400).send({ message: error.message });
    }
    else if (error.message === "No Applications Found!") {
        res.status(404).send({ message: error.message });
    }
    else if (error.message === "Error deleting application") {
        res.status(404).send({ message: error.message });
    }
    else if (error.name === "PrismaClientValidationError") {
        res.status(400).send({ message: error.name });
    }
    else if (error.meta.cause === "Record to update not found.") {
        res.status(400).send({ message: error.meta.cause });
    }
    else if (error.meta.cause === "Record to delete does not exist.") {
        res.status(404).send({ message: error.meta.cause });
    }
    else {
        res.status(500).send({ message: error });
    }
}
exports.default = errorRouter;
//# sourceMappingURL=errorRouter.js.map