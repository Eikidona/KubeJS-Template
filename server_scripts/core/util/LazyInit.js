// priority: 9999

/**
 * @class
 * @classdesc 用于延迟初始化的容器对象
 * @template T
 * @param {Internal.Supplier_<T>} pSupplier 
 */
function LazyInit(pSupplier) {
  /**@type {T} */
  this.value;
  /**@type {Internal.Supplier_<T>} */
  this.supplier = pSupplier;
}

LazyInit.prototype = {
  /**
   * @returns {T}
   */
  get: function () {
    if (!(Boolean(this.value))) {
      this.value = this.supplier();
    }
    return this.value;
  }
}