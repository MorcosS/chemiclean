import React, { ChangeEvent } from "react";
import { Product } from "../../redux/types/products/productsTypes";
import { CONSTANTS } from "../../constants/Constants";
import i18n from "i18next";

interface ProductItemState {
  isNameEditable: boolean;
  isSupplierEditable: boolean;
  isUpdatedEditable: boolean;
  name: string;
  supplier: string;
  isUpdated: boolean;
}

interface ProductProps {
  product: Product;
  deleteItem: (id: number) => void;
  updateItem: (product: Product) => void;
  updateProductDocument: (id: number) => void;
}

export default class ProductComponent extends React.Component<
  ProductProps,
  ProductItemState
> {
  constructor(props: ProductProps) {
    super(props);
    this.state = {
      name: props.product.name,
      supplier: props.product.supplier,
      isUpdated: props.product.isUpdated,
      isNameEditable: false,
      isSupplierEditable: false,
      isUpdatedEditable: false
    };
  }

  updateCell(cellType: string, editable: boolean) {
    switch (cellType) {
      case "name":
        {
          this.setState({ isNameEditable: editable });
        }
        break;
      case "supplier":
        this.setState({ isSupplierEditable: editable });
        break;
      case "isUpdated":
        this.setState({ isUpdatedEditable: editable });
        break;
      default:
        break;
    }
  }

  change(cellType: string, event: React.ChangeEvent<HTMLInputElement>) {
    const { updateItem, product } = this.props;
    const { name, supplier, isUpdated } = this.state;
    switch (cellType) {
      case "name":
        {
          this.setState({ name: event.target.value });
          updateItem({
            supplier: supplier,
            isUpdated: isUpdated,
            name: event.target.value,
            id: product.id
          });
        }
        break;
      case "supplier":
        {
          this.setState({ supplier: event.target.value });
          updateItem({
            supplier: event.target.value,
            isUpdated: isUpdated,
            name: name,
            id: product.id
          });
        }
        break;
      case "isUpdated":
        {
          this.setState({ isUpdated: event.target.checked });
          updateItem({
            supplier: supplier,
            isUpdated: event.target.checked,
            name: name,
            id: product.id
          });
        }
        break;
      default:
        break;
    }
  }

  handleDeleteItem = () => {
    const { deleteItem, product } = this.props;
    if (window.confirm(i18n.t(CONSTANTS.DELETE_CONFIRMATION_MESSAGE))) {
      deleteItem(product.id);
    }
  };

  render() {
    const { id } = this.props.product;
    const { updateProductDocument } = this.props;
    const {
      isNameEditable,
      isSupplierEditable,
      isUpdatedEditable,
      name,
      isUpdated,
      supplier
    } = this.state;
    return (
      <tr>
        <td>{id}</td>
        <td onClick={() => this.updateCell("name", true)}>
          {!isNameEditable ? (
            name
          ) : (
            <input
              onChange={event => this.change("name", event)}
              onBlur={() => this.updateCell("name", false)}
              onKeyDownCapture={event =>
                event.keyCode === 13 && this.updateCell("name", false)
              }
              autoFocus={true}
              defaultValue={name}
            />
          )}
        </td>
        <td onClick={() => this.updateCell("supplier", true)}>
          {!isSupplierEditable ? (
            supplier
          ) : (
            <input
              onChange={event => this.change("supplier", event)}
              onBlur={() => this.updateCell("supplier", false)}
              onKeyDownCapture={event =>
                event.keyCode === 13 && this.updateCell("supplier", false)
              }
              autoFocus={true}
              defaultValue={supplier}
            />
          )}
        </td>
        <td onClick={() => this.updateCell("isUpdated", true)}>
          {!isUpdatedEditable ? (
            isUpdated.toString()
          ) : (
            <input
              onChange={event => this.change("isUpdated", event)}
              onBlur={() => this.updateCell("isUpdated", false)}
              type="checkbox"
              defaultChecked={isUpdated}
            />
          )}
        </td>
        <td>
          <a href={CONSTANTS.BASE_URL + "Download/" + id} download>
            {i18n.t(CONSTANTS.DOWNLOAD_DOC)}
          </a>
          <a onClick={() => updateProductDocument(id)}>
            {i18n.t(CONSTANTS.UPDATE_DOC)}
          </a>
        </td>
        <td>
          <span
            onClick={this.handleDeleteItem}
            className="glyphicon glyphicon-trash"
          ></span>
        </td>
      </tr>
    );
  }
}
