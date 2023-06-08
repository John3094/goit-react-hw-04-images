import { Component } from 'react';
import { getImages } from '../service/Api';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    collections: [],
    query: '',
    page: 1,
    totalHits: 0,
    isLoding: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoding: true });
        const { hits, totalHits } = await getImages(query, page);
        this.setState(prevState => ({
          collections: [...prevState.collections, ...hits],
          totalHits: totalHits,
        }));
        if (hits.length === 0) {
          return toast.error(`Відповідь на запит ${query} відсутня :(`);
        }
        if (this.state.page !== 1) {
          this.smoothScroll();
        }
      } catch (error) {
        toast.error(`Помилка, спробуйте ще раз ${error.message} :(`);
      } finally {
        this.setState({ isLoding: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, collections: [] });
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
    const { collections, isLoding, totalHits } = this.state;
    const allPage = totalHits / collections.length;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {collections.length !== 0 && <ImageGallery collections={collections} />}
        {allPage > 1 && !isLoding && collections.length > 0 && (
          <ButtonLoadMore onClick={this.onClickLoadMoreBtn} />
        )}
        <Toaster
          toastOptions={{ style: { background: '#ff1111', color: '#fff' } }}
        />
        {isLoding && <Loader />}
      </Container>
    );
  }
}
