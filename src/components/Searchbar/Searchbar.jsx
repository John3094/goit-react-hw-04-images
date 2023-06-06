import { Component } from 'react';
import {
  Header,
  SearchForm,
  Button,
  ButtonLabel,
  Input,
} from './SearchbarStyled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (query.length !== 0) {
      this.props.onSubmit(query.trim());
      this.reset();
    }
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </Header>
    );
  }
}
