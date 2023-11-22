import type { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  sortColumns: {
    display: 'grid',
    width: '100%',
    columnGap: '24px',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  },
  sortDropdown: {
    backgroundColor: theme.palette.background.v2.searchBg,
    [theme.breakpoints.up('md')]: {
      width: '200px',
      maxWidth: '100%',
      marginLeft: 'auto',
    },
  },
});
