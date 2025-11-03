import {
  Dots,
  NextLink,
  PageLink,
  Pagination as StrapiPagination,
  PreviousLink,
} from '@strapi/design-system';
import { useMemo } from 'react';
import { IPagination } from '../../../../types/Common';

export const Pagination = ({
  pagination: paginationProp,
  onPagePress,
}: {
  pagination: IPagination;
  onPagePress: (page: number) => void;
}) => {
  const pagination = useMemo(() => {
    if (!paginationProp) {
      return null;
    }
    return {
      page: paginationProp.page || 1,
      pages: Array.from({ length: paginationProp.pageCount }).map((_, i) => i),
      split: paginationProp.pageCount > 5,
    };
  }, [paginationProp]);

  const handlePagePress = (page: number) => () => {
    onPagePress(page);
  };

  if (!pagination || pagination.pages.length === 1) {
    return <></>;
  }
  if (pagination.split)
    return (
      <StrapiPagination activePage={pagination.page} pageCount={pagination.pages.length}>
        <PreviousLink
          disabled={pagination.page === 1}
          onClick={handlePagePress(pagination.page - 1)}
        >
          Previous
        </PreviousLink>

        <PageLink
          number={
            pagination.page <= pagination.pages.length - 4
              ? pagination.page
              : pagination.pages.length - 3
          }
          onClick={handlePagePress(
            pagination.page <= pagination.pages.length - 4
              ? pagination.page
              : pagination.pages.length - 3
          )}
        >
          Go to{' '}
          {pagination.page <= pagination.pages.length - 4
            ? pagination.page
            : pagination.pages.length - 3}
        </PageLink>

        <PageLink
          number={
            pagination.page <= pagination.pages.length - 4
              ? pagination.page + 1
              : pagination.pages.length - 2
          }
          onClick={handlePagePress(
            pagination.page <= pagination.pages.length - 4
              ? pagination.page + 1
              : pagination.pages.length - 2
          )}
        >
          Go to{' '}
          {pagination.page <= pagination.pages.length - 4
            ? pagination.page + 1
            : pagination.pages.length - 2}
        </PageLink>

        {pagination.page <= pagination.pages.length - 4 && (
          <Dots>{`And ${pagination.pages.length - 4} other links`}</Dots>
        )}

        <PageLink
          number={pagination.pages.length - 1}
          onClick={handlePagePress(pagination.pages.length - 1)}
        >
          Go to {pagination.pages.length}
        </PageLink>

        <PageLink
          number={pagination.pages.length}
          onClick={handlePagePress(pagination.pages.length)}
        >
          Go to {pagination.pages.length}
        </PageLink>

        <NextLink onClick={handlePagePress(pagination.page + 1)}>Next page</NextLink>
      </StrapiPagination>
    );

  return (
    <StrapiPagination activePage={pagination.page} pageCount={pagination.pages.length}>
      {
        <PreviousLink
          tag="div"
          disabled={pagination.page - 1 <= 0}
          onClick={handlePagePress(pagination.page - 1)}
        >
          Previous
        </PreviousLink>
      }
      {pagination.pages.map((page) => (
        <PageLink tag="a" number={page + 1} onClick={handlePagePress(page + 1)} key={page}>
          Go to {page + 1}
        </PageLink>
      ))}
      <NextLink
        tag="div"
        disabled={pagination.page + 1 > pagination.pages.length}
        onClick={handlePagePress(pagination.page + 1)}
      >
        Next page
      </NextLink>
    </StrapiPagination>
  );
};
