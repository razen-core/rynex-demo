import * as UI from 'rynex';

export default function Header() {
  const headerStyle = document.createElement('style');
  headerStyle.textContent = `
    header {
      width: 100%;
      box-sizing: border-box;
    }
    @media (max-width: 768px) {
      header {
        padding: 1rem !important;
        flex-wrap: wrap;
      }
      header h1 {
        font-size: 1.2rem !important;
      }
      header .header-text {
        font-size: 0.75rem !important;
      }
    }
    @media (max-width: 480px) {
      header {
        padding: 0.75rem !important;
        gap: 0.5rem !important;
      }
      header h1 {
        font-size: 1rem !important;
      }
      header .header-text {
        font-size: 0.7rem !important;
      }
    }
  `;
  document.head.appendChild(headerStyle);

  return UI.header({
    style: {
      padding: '1.5rem 2rem',
      background: '#0a0a0a',
      borderBottom: '1px solid #333333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, [
    UI.hbox({
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        cursor: 'pointer'
      },
      onClick: () => window.location.href = '/'
    }, [
      UI.image({
        src: '/logo/rynex_logo.png',
        alt: 'Rynex Logo',
        style: {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover'
        }
      }),
      UI.h1({
        style: {
          color: '#00ff88',
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '800',
          fontFamily: '"Montserrat", sans-serif',
          whiteSpace: 'nowrap'
        }
      }, 'Rynex')
    ]),
    
    UI.hbox({
      style: {
        gap: '1rem',
        alignItems: 'center',
        minWidth: 0
      }
    }, [
      UI.text({
        class: 'header-text',
        style: {
          color: '#b0b0b0',
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, 'Modern Web Framework')
    ])
  ]);
}
