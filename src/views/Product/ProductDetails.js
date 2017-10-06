import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Card, Image, Icon, Button } from 'semantic-ui-react';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/actions';
import Rating from '../../components/Rating';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  getCategories() {
    return this.props.product.categories.reduce(
      (categString, category, index) => categString + category.name + (index === this.props.product.categories.length - 1 ? '' : ', '),
      ' ',
    );
  }

  addItem() {
    const { dispatch } = this.props;
    const product = this.props.product;
    dispatch(addProduct(product.id, product.name, product.price, product.images[0].src));
  }

  render() {
    return (
      <div>
        <Header textAlign="center">{this.props.product.name}</Header>
        <Card centered raised>
          <Image src={this.props.product.images[0].src} />
          <Card.Content extra>
            {Number(this.props.product.average_rating) === 0 ? (
              <p>No ratings</p>
            ) : (
              <Rating rating={Number(this.props.product.average_rating)} ratingCount={this.props.product.rating_count} />
            )}
          </Card.Content>
          {this.props.product.categories.length === 0 ? null : <Card.Content>Categories: {this.getCategories()}</Card.Content>}
          <Card.Content>Stock: {this.props.product.in_stock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          <Card.Content>Price: {this.props.product.price}$</Card.Content>
          <Button color="purple" fluid onClick={this.addItem}>
            ADD TO CART &nbsp;<Icon name="cart" />
          </Button>
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered raised>
            <Card.Content>
              <Card.Header as={Header} size="tiny">
                Description
              </Card.Header>
              <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ addProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);
