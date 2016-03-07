export default input => input.split('').map(($0) => (parseInt($0, 36) - 10)).reduce((st, n) => 26 * st + (n + 1), 0);
