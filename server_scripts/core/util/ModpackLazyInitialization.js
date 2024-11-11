// priority: 9999

/**
 * @class
 * @classdesc 用于延迟初始化 保证初始化不会因为加载顺序发生undefined
 * @template T
 * @param {Internal.Supplier_<T>} pSupplier 
 */
function ModpackLazyInitialization(pSupplier) {
  /**@type {T} */
  this.value;
  /**@type {Internal.Supplier_<T>} */
  this.supplier = pSupplier;
}

ModpackLazyInitialization.prototype = {
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