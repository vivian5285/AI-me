
/**
 * 验证用户输入的中间件
 * @param {Array<string>} requiredFields 必填字段
 * @returns {function} 中间件函数
 */
function validateInput(requiredFields) {
    return (req, res, next) => {
        const errors = [];
        requiredFields.forEach((field) => {
            if (!req.body[field]) {
                errors.push(`${field} is required`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ status: 'error', errors });
        }

        next();
    };
}

module.exports = validateInput;
