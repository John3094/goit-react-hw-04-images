import { Component } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30810115-52ef4f114e7fdb651b12fd85a';

export class App extends Component {
  state = {
    collections: [],
    query: '',
    page: 1,
    isLoding: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { collections, query, page } = this.state;
    if (prevState.query !== this.state.query) {
      this.setState({ collections: [] });
    }
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoding: true });
        const response = await axios.get(
          `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState({
          collections: [...collections, ...response.data.hits],
        });
        if (response.data.hits.length === 0) {
          toast.error(`Відповідь на запит ${query} відсутня :(`);
        }
        if (page !== 1) {
          this.smoothScroll();
        }
      } catch {
        toast.error('Помилка, спробуйте ще раз :(');
      } finally {
        this.setState({ isLoding: false });
      }
    }
  }

  addImage = ({ query }) => {
    this.setState({ query: query });
  };

  smoothScroll = () => {
    window.scrollBy({
      top: 300,
      behavior: 'smooth',
    });
  };

  onClickLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { collections, page, isLoding } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.addImage} />
        {collections && <ImageGallery collections={collections} page={page} />}
        {collections.length > 0 && (
          <ButtonLoadMore onClick={this.onClickLoadMoreBtn} />
        )}
        <Toaster
          toastOptions={{ style: { background: '#ff1111', color: '#fff' } }}
        />
        {isLoding === true && <Loader />}
      </Container>
    );
  }
}
