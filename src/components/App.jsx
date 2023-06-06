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

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ collections: [] });
      this.setState({ page: 1 });
    }
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoding: true });

        const collectionsList = await getImages(query, page);
        this.setState({
          collections: [...this.state.collections, ...collectionsList.hits],
          totalHits: collectionsList.totalHits,
        });
        if (collectionsList.totalHits === 0) {
          toast.error(`Відповідь на запит ${query} відсутня :(`);
        }
        if (this.state.page !== 1) {
          this.smoothScroll();
        }
      } catch {
        toast.error('Помилка, спробуйте ще раз :(');
      } finally {
        this.setState({ isLoding: false });
      }
    }
  }

  addImage = query => {
    this.setState({ query });
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
        {collections.length > 0 &&
          this.state.totalHits / 12 > this.state.page && (
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
