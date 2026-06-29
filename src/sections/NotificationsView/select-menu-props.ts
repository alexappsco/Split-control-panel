export const scrollableSelectMenuProps = {
  PaperProps: {
    sx: {
      maxHeight: 280,
      borderRadius: '12px',
      mt: 0.75,
      boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      '& .MuiList-root': {
        py: 0.75,
      },
      '& .MuiMenuItem-root': {
        py: 1.1,
        px: 1.75,
        mx: 0.75,
        my: 0.25,
        borderRadius: '8px',
        fontSize: '0.9375rem',
        fontWeight: 500,
        color: '#374151',
        '&:hover': {
          backgroundColor: 'rgba(56, 168, 172, 0.08)',
        },
        '&.Mui-selected': {
          backgroundColor: 'rgba(56, 168, 172, 0.14)',
          color: '#111827',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'rgba(56, 168, 172, 0.18)',
          },
        },
      },
    },
  },
};
