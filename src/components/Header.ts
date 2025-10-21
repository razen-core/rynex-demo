import * as UI from 'rynex';

export default function Header() {
  return UI.header({
    style: {
      padding: '1.5rem 2rem',
      background: '#0a0a0a',
      borderBottom: '1px solid #333333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
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
          fontFamily: '"Montserrat", sans-serif'
        }
      }, 'Rynex')
    ]),
    
    UI.hbox({
      style: {
        gap: '1rem',
        alignItems: 'center'
      }
    }, [
      UI.text({
        style: {
          color: '#b0b0b0',
          fontSize: '0.875rem'
        }
      }, 'Modern Web Framework')
    ])
  ]);
}
