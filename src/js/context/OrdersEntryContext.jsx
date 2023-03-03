import { createContext, useContext, useReducer, useRef } from "react";
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import Orders from "../libraries/models/Orders";
import ordersEntryReducer from '../reducer/ordersEntryReducer'
import {Modal} from 'flowbite';

const OrdersEntryContext = createContext();

const Provider = ({children}) => {

  //b State and Ref Management ----------------------------------------
  const [state, dispatch] = useReducer(ordersEntryReducer, {
    all_orders: [],
    all_currents: [],
    all_stocks: [],
    get_order_details: {},
    get_order_items: [],
    get_order_modal: {},
    entry_product_details: {},
    add_entry_order_product_modal: {},
    entry_product_modal: {},
    entry_product_units: [],
    filtered_stocks: [],
    chosen_stock: {},
    chosen_stock_units: [],
    toggle_filtered_stock_table: false,
    table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    show_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  })

  const ordersEntryCurrentNameEditRef = useRef("")
  const ordersEntryOrderSourceEditRef = useRef("")
  const ordersEntryInvoicedEditRef = useRef("")
  const ordersEntryDateEditRef = useRef("")
  const ordersEntryDeliveryDateEditRef = useRef("")

  const entryProductNameEditRef = useRef("")
  const entryProductUnitEditRef = useRef("")
  const entryProductAmountEditRef = useRef("")
  const entryProductPriceEditRef = useRef("")
  const entryProductTaxRateEditRef = useRef("")
  const entryProductDescriptionEditRef = useRef("")

  const addOrderEntryProductUnitEditRef = useRef("")
  const addOrderEntryProductAmountEditRef = useRef("")
  const addOrderEntryProductPriceEditRef = useRef("")
  const addOrderEntryProductTaxRateEditRef = useRef("")
  const addOrderEntryProductDescriptionEditRef = useRef("")

  const addEntryOrdersProductSearchInputRef = useRef("")

  //b Functions -------------------------------------------------------
  //- Main Table Funcs
  const showStocks = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Stock.showStock(query)

    dispatch({
      type: "ALL_STOCKS",
      value: resp
    })
    
    dispatch({
      type: 'FILTERED_STOCKS',
      value: resp
    })
  }

  const showCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Current.showCurrent(query)

    dispatch({
      type: "ALL_CURRENTS",
      value: resp
    })
  }
  
  const showOrders = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Orders.showOrders(query);

    dispatch({
      type: "ALL_ORDERS",
      value: resp
    })
  }

  const removeOrder = async (id) => {
    let remove = await Orders.removeOrder(id);
    console.log(remove);

    await showOrders();
  }

  //- Edit Orders
  const getOrderDetails = async (id) => {
    let dt = [];

    for (let o of state.all_orders) {
      if (o.id === id) dt = o
    }

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: dt.items
    })

    dispatch({
      type: 'GET_ORDER_DETAILS',
      value: dt
    })

    for (let c of state.all_currents) {
      if (c.id === dt.details.current_id) var cur_name = c.details.id + " / " + c.details.name
    }

    let invoiced = "Faturalı";
    if (dt.details.invoiced === false) {
      invoiced = "Faturasız"
    }

    let date = dt.details.date.split("T")[0]
    let delivery_date = dt.details.delivery_date.split("T")[0]

    ordersEntryCurrentNameEditRef.current.innerHTML = cur_name
    ordersEntryOrderSourceEditRef.current.value = dt.details.order_source
    ordersEntryInvoicedEditRef.current.value = invoiced
    ordersEntryDateEditRef.current.value = date
    ordersEntryDeliveryDateEditRef.current.value = delivery_date

    let show_get_order_details_modal = showGetOrderDetailsModal();
    show_get_order_details_modal.show();    
  }

  const getProductDetails = async (id) => {
    let dt = [];

    for (let o of state.get_order_items) {
      if (o.id === id) dt = o
    }

    dispatch({
      type: 'ENTRY_PRODUCT_DETAILS',
      value: dt
    })

    for (let s of state.all_stocks) {
      if (dt.stock_id === s.id) {
        var units = [s.details.unit, s.details.unit_2]
        var name = s.details.id  + " / " + s.details.name
      }
    }

    dispatch({
      type: 'ENTRY_PRODUCT_UNITS',
      value: units
    })

    let tax_rate = "%8"
    if (dt.tax_rate === 0.18) tax_rate = "%18"

    entryProductNameEditRef.current.innerHTML = name
    entryProductUnitEditRef.current.value = dt.unit
    entryProductAmountEditRef.current.value = dt.amount
    entryProductPriceEditRef.current.value = dt.price
    entryProductTaxRateEditRef.current.value = tax_rate
    entryProductDescriptionEditRef.current.value = dt.description
    
    let entry_product_modal = showEntryProductDetailsModal();
    entry_product_modal.show();  
  }

  const editOrdersEntry = async (dt) => {
    let invoiced = true;
    if (ordersEntryInvoicedEditRef.current.value === "Faturasız") invoiced = false;

    let details = {
      date: ordersEntryDateEditRef.current.value + "T00:00:00.000Z",
      delivery_date: ordersEntryDeliveryDateEditRef.current.value + "T00:00:00.000Z",
      order_source: ordersEntryOrderSourceEditRef.current.value,
      invoiced: invoiced,
      items: state.get_order_items
    }

    let o = await Orders.getOrder(dt.id)

    let edit = await o.editOrder(details);
    console.log(edit);

    if(edit.Success) {
      hideGetOrderDetailsModal()
      showOrders();
    }

  }

  const editEntryProduct = async (dt) => {
    let items = [...state.get_order_items]
    console.log(items);

    for (let ind in items) {
      let i = items[ind]
      if (dt.id === i.id) {
        items[ind] = {
          ...i,
          unit : entryProductUnitEditRef.current.value,
          amount: Number(entryProductAmountEditRef.current.value),
          price: Number(entryProductPriceEditRef.current.value),
          tax_rate: ((entryProductTaxRateEditRef.current.value).replace("%", "") / 100),  //, .replace("%", "") / 100
          description: entryProductDescriptionEditRef.current.value
        }
      }
    }

    dispatch({
      type: "GET_ORDER_ITEMS",
      value: items
    })

    hideEntryProductDetailsModal();
  }

  const removeProduct = async (id) => {
    let items = [...state.get_order_items]

    for (let ind in items) {
      let i = items[ind]
      if (id === i.id) {
        items.splice(i,1)
      }
    }
    
    for (let p in items) {                          //. Every time a product is added rearrange row numbers
      items[p].row = parseInt(p) + 1      
    }

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: items,
    })

  }

  const addOrderEntryProduct = () => {
    (addOrderEntryProductUnitEditRef.current.value)
    addOrderEntryProductAmountEditRef.current.value
    addOrderEntryProductPriceEditRef.current.value
    addOrderEntryProductTaxRateEditRef.current.value
    addOrderEntryProductDescriptionEditRef.current.value
  }

  //- Stocks Autocomplete
  
  const toggleFilteredStockTable = (e) => {

    if(e.target.id !== 'add_entry_order_product_button' && e.target.id !== 'add_entry_order_product_input' && e.target.id !== 'add_entry_order_product_button_icon') {
      dispatch({
        type: 'TOGGLE_FILTERED_STOCK_TABLE',
        value: false
      })
    }
    else {
      if(state.toggle_filtered_stock_table !== true) {
        dispatch({
          type: 'TOGGLE_FILTERED_STOCK_TABLE',
          value: true
        })
      }
    }

  }
  
  const printStockDetails = (details) => {
    if(details === undefined) {
      dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: []
      })
    }
    else {
      dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: [details.details.unit, details.details.unit_2]
      })      
    }
  }

  const filterStocks = (e) => {

    if (e.target.value === "") {
      printStockDetails(undefined);   //. For clearing out current details inputs
    }

    const searchWord = e.target.value.toLowerCase();
    const newFilter = state.all_stocks.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLowerCase().includes(searchWord) ||
          (source.details.name).toLowerCase().includes(searchWord) ||
          (source.details.material).toLowerCase().includes(searchWord) ||
          (source.details.product_group).toLowerCase().includes(searchWord);
      } 
      else {
        condition = source.id.toLowerCase().includes(searchWord);
      }

      return condition;
    });
    
    dispatch({
      type: 'FILTERED_STOCKS',
      value: newFilter
    })

  }

  const chooseFilteredStock = async (id) => {
    let st = await Stock.getStock(id);

    dispatch({
      type: 'CHOSEN_STOCK',
      value: st
    })
    
    dispatch({
      type: 'TOGGLE_FILTERED_STOCK_TABLE',
      value: false
    })

    addEntryOrdersProductSearchInputRef.current.value = st.details.id + " - " + st.details.name

    printStockDetails(st);
  }

  //- Modal Funcs
  const showGetOrderDetailsModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("showOrdersEntryModal");
    const modal = new Modal(el, options);

    dispatch({
      type: 'GET_ORDER_MODAL',
      value: modal
    })

    return modal;
  }

  const hideGetOrderDetailsModal = () => {
    state.get_order_modal.hide();

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: []
    })

    dispatch({
      type: 'GET_ORDER_DETAILS',
      value: {}
    })

    dispatch({
      type: 'GET_ORDER_MODAL',
      value: {}
    })
  }

  const showEntryProductDetailsModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editOrdersEntryProductModal");
    const modal = new Modal(el, options);

    dispatch({
      type: 'ENTRY_PRODUCT_MODAL',
      value: modal
    })

    return modal;
  }

  const hideEntryProductDetailsModal = () => {
    state.entry_product_modal.hide();
    // clearCurrentEditInputs();

    dispatch({
      type: 'ENTRY_PRODUCT_DETAILS',
      value: []
    })

    dispatch({
      type: 'ENTRY_PRODUCT_MODAL',
      value: {}
    })
  }

  const showAddEntryOrderProductModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("addOrderEntryProductModal");
    const modal = new Modal(el, options);

    dispatch({
      type: 'ADD_ENTRY_ORDER_PRODUCT_MODAL',
      value: modal
    })

    return modal.show();
  }

  const hideAddEntryOrderProductModal = () => {

  }

  const orders_entry = {

    //, Refs
    ordersEntryCurrentNameEditRef,
    ordersEntryOrderSourceEditRef,
    ordersEntryInvoicedEditRef,
    ordersEntryDateEditRef,
    ordersEntryDeliveryDateEditRef,

    entryProductNameEditRef,
    entryProductUnitEditRef,
    entryProductAmountEditRef,
    entryProductPriceEditRef,
    entryProductTaxRateEditRef,
    entryProductDescriptionEditRef,

    addOrderEntryProductUnitEditRef,
    addOrderEntryProductAmountEditRef,
    addOrderEntryProductPriceEditRef,
    addOrderEntryProductTaxRateEditRef,
    addOrderEntryProductDescriptionEditRef,

    addEntryOrdersProductSearchInputRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    addOrderEntryProduct,
    chooseFilteredStock,
    editEntryProduct,
    editOrdersEntry,
    filterStocks,
    getOrderDetails,
    getProductDetails,
    hideAddEntryOrderProductModal,
    hideEntryProductDetailsModal,
    hideGetOrderDetailsModal,
    removeOrder,
    removeProduct,
    showAddEntryOrderProductModal,
    showCurrents,
    showStocks,
    showOrders,
    toggleFilteredStockTable,
  }
  
  return (
    <OrdersEntryContext.Provider value={orders_entry}>
      {children}
    </OrdersEntryContext.Provider>
  )
}

export const useOrdersEntry = () => useContext(OrdersEntryContext)
export default Provider
