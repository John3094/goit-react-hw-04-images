import { useState, useEffect } from 'react';
import { getImages } from '../service/Api';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';

export const App = () => {
  const [collections, setCollections] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async (query, page) => {
      setIsLoding(true);
      try {
        const { hits, totalHits } = await getImages(query, page);
        if (hits.length === 0) {
          return toast.error(`Відповідь на запит ${query} відсутня :(`);
        }
        setCollections(prev => [...prev, ...hits]);
        setTotalHits(totalHits);
        if (page !== 1) {
          smoothScroll();
        }
      } catch (error) {
        toast.error(`Помилка, спробуйте ще раз ${error.message} :(`);
      } finally {
        setIsLoding(false);
      }
    };
    fetchImages(query, page);
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setCollections([]);
  };

  const smoothScroll = () => {
    window.scrollBy({
      top: 300,
      behavior: 'smooth',
    });
  };

  const onClickLoadMoreBtn = () => {
    setPage(prev => prev + 1);
  };

  const allPage = totalHits / collections.length;

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {collections.length !== 0 && <ImageGallery collections={collections} />}
      {allPage > 1 && !isLoding && collections.length > 0 && (
        <ButtonLoadMore onClick={onClickLoadMoreBtn} />
      )}
      <Toaster
        toastOptions={{ style: { background: '#ff1111', color: '#fff' } }}
      />
      {isLoding && <Loader />}
    </Container>
  );
};
