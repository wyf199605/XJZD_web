
const Tools = {
    /**
     *
     * @param {number} num
     * @returns {string}
     */
    formatCurrency(num) {
        return '¥' + (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
};

export default Tools;