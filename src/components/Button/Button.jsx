import { Button } from './Button.styled';

export const ButtonLoadMore = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
};
