import React, { ChangeEvent } from "react";
import Product from "../../redux/types/products/productsTypes";
import { CONSTANTS } from '../../constants/Constants';
import i18n from "i18next";


interface ProductItemState {
  isNameEditable: boolean,
  isSupplierEditable: boolean,
  isUpdatedEditable: boolean,
  name: string,
  supplier: string,
  isUpdated: boolean
}

export default class UserComponent extends React.Component<Product, ProductItemState> {
  constructor(props: Product) {
    super(props);
    this.state = {
      name: props.name,
      supplier: props.supplier,
      isUpdated: props.isUpdated,
      isNameEditable: false,
      isSupplierEditable: false,
      isUpdatedEditable: false
    }
  }


  updateCell(cellType: string, editable: boolean) {
    switch (cellType) {
      case "name": {
        this.setState({ isNameEditable: editable });

      } break;
      case "supplier": this.setState({ isSupplierEditable: editable }); break;
      case "isUpdated": this.setState({ isUpdatedEditable: editable }); break;
      default: break;
    }
  }


  change(cellType: string, event: React.ChangeEvent<HTMLInputElement>) {
    switch (cellType) {
      case "name": {
        this.setState({ name: event.target.value });

      } break;
      case "supplier": this.setState({ supplier: event.target.value }); break;
      case "isUpdated": this.setState({ isUpdated: (event.target.checked) }); break;
      default: break;
    }
  }

  render() {
    const { id } = this.props
    const { isNameEditable,
      isSupplierEditable,
      isUpdatedEditable, name, isUpdated, supplier } = this.state
    return (
      <tr>
        <td>{id}</td>
        <td onClick={() => this.updateCell('name', true)} >{!isNameEditable ? name : <input onChange={(event) => this.change("name", event)} onBlur={() => this.updateCell('name', false)} onKeyDownCapture={(event) =>
          event.keyCode === 13 && this.updateCell('name', false)} autoFocus={true} defaultValue={name} />}</td>
        <td onClick={() => this.updateCell('supplier', true)}  >{!isSupplierEditable ? supplier : <input onChange={(event) => this.change("supplier", event)} onBlur={() => this.updateCell('supplier', false)} onKeyDownCapture={(event) =>
          event.keyCode === 13 && this.updateCell('supplier', false)} autoFocus={true} defaultValue={supplier} />}</td>
        <td onClick={() => this.updateCell('isUpdated', true)} >{!isUpdatedEditable ? isUpdated.toString() : <input onChange={(event) => this.change("isUpdated", event)} onBlur={() => this.updateCell('isUpdated', false)} type="checkbox" defaultChecked={isUpdated} />}</td>
        <td><a href={CONSTANTS.BASE_URL + "Download?id=" + id} download>{i18n.t(CONSTANTS
          .DOWNLOAD_DOC)}</a></td>

      </tr>
    );
  }
}
