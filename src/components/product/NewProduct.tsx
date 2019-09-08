import React, { ChangeEvent, useState } from "react";
import { Product } from "../../redux/types/products/productsTypes";
import { CONSTANTS } from "../../constants/Constants";
import i18n from "i18next";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NewProduct } from "../../redux/types/products/productsTypes";

interface NewProductItemState {
  Name: string;
  Supplier: string;
  Uri: string;
  UserName: string;
  Password: string;
}

interface NewProductItemProps {
  addProduct: (product: NewProduct) => void;
}

interface ProductProps {}

export default class AddProduct extends React.Component<
  NewProductItemProps,
  NewProductItemState
> {

    constructor(props: NewProductItemProps)
    {
        super(props);
        this.state ={ 
            Name:"", Supplier:"", Uri:"", UserName:"", Password:""
        }
    }



  change(cellType: string, event: React.ChangeEvent<HTMLInputElement>) {
    switch (cellType) {
      case "name":
        {
          this.setState({ Name: event.target.value });
        }
        break;
      case "supplier":
        {
          this.setState({ Supplier: event.target.value });
        }
        break;
      case "uri":
        {
          this.setState({ Uri: event.target.value });
        }
        break;
      case "username":
        {
          this.setState({ UserName: event.target.value });
        }
        break;
      case "password":
        {
          this.setState({ Password: event.target.value });
        }
        break;
      default:
        break;
    }
  }

  onSubmit = (x: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { Name, Supplier, Uri, UserName, Password } = this.state;
    const { addProduct } = this.props;
    addProduct({ Name, Supplier, Uri, UserName, Password });
  };

  render() {
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <label>{i18n.t(CONSTANTS.NAME)} &nbsp;</label>
            <input onChange={event => this.change("name", event)} />
            <br />
            <label>{i18n.t(CONSTANTS.SUPPLIER)} &nbsp;</label>
            <input onChange={event => this.change("supplier", event)} />
            <br />
            <label>{i18n.t(CONSTANTS.URI)} &nbsp;</label>
            <input onChange={event => this.change("uri", event)} />
            <br />
            <label>{i18n.t(CONSTANTS.USERNAME)} &nbsp;</label>
            <input onChange={event => this.change("username", event)} />
            <br />
            <label>{i18n.t(CONSTANTS.PASSWORD)} &nbsp;</label>
            <input
              onChange={event => this.change("password", event)}
              type="password"
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.onSubmit} variant="secondary">
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
