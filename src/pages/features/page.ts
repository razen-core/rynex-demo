import * as UI from 'rynex';
import { state, Link } from 'rynex';

export default function FeaturesPage() {
  const featuresState = state({
    selectedCategory: 'all'
  });

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'core', name: 'Core' },
    { id: 'routing', name: 'Routing' },
    { id: 'state', name: 'State Management' },
    { id: 'performance', name: 'Performance' }
  ];

  const features = [
    {
      category: 'core',
      icon: '<path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>',
      title: 'Reactive State Management',
      description: 'Proxy-based reactivity with automatic UI updates. No manual subscriptions, no hooks complexity.',
      features: ['Automatic dependency tracking', 'Fine-grained updates', 'Computed values', 'Effects and watchers']
    },
    {
      category: 'core',
      icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
      title: 'No Virtual DOM',
      description: 'Direct DOM manipulation for maximum performance. Zero overhead from diffing algorithms.',
      features: ['Direct updates', 'Minimal memory footprint', 'Faster rendering', 'Predictable performance']
    },
    {
      category: 'core',
      icon: '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>',
      title: 'TypeScript First',
      description: 'Built with TypeScript from the ground up. Full type safety and excellent IDE support.',
      features: ['Complete type definitions', 'IntelliSense support', 'Compile-time safety', 'Better refactoring']
    },
    {
      category: 'routing',
      icon: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
      title: 'File-Based Routing',
      description: 'Next.js style routing with automatic route generation from your file structure.',
      features: ['Dynamic routes', 'Nested routes', 'Route parameters', 'Query strings']
    },
    {
      category: 'routing',
      icon: '<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>',
      title: 'Lazy Loading',
      description: 'Automatic code splitting and lazy loading for optimal bundle sizes.',
      features: ['Route-based splitting', 'Component lazy loading', 'Suspense support', 'Loading states']
    },
    {
      category: 'routing',
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
      title: 'Navigation Guards',
      description: 'Middleware support for authentication, authorization, and route protection.',
      features: ['Before navigation hooks', 'Route middleware', 'Redirect support', 'Error handling']
    },
    {
      category: 'state',
      icon: '<path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>',
      title: 'Computed Values',
      description: 'Derived state that automatically updates when dependencies change.',
      features: ['Automatic caching', 'Dependency tracking', 'Lazy evaluation', 'Memoization']
    },
    {
      category: 'state',
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
      title: 'Effects & Watchers',
      description: 'Side effects that run automatically when reactive dependencies change.',
      features: ['Automatic cleanup', 'Async support', 'Batch updates', 'Lifecycle hooks']
    },
    {
      category: 'performance',
      icon: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
      title: 'Fine-Grained Reactivity',
      description: 'Only update what changed. No unnecessary re-renders or component updates.',
      features: ['Surgical updates', 'Minimal DOM operations', 'Efficient diffing', 'Smart batching']
    },
    {
      category: 'performance',
      icon: '<path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>',
      title: 'Bundle Size Optimization',
      description: 'Tiny core with tree-shakeable utilities. Only ship what you use.',
      features: ['15KB gzipped core', 'Tree-shakeable', 'No dependencies', 'Modular architecture']
    },
    {
      category: 'performance',
      icon: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
      title: 'Async Operations',
      description: 'Built-in support for async operations with loading and error states.',
      features: ['Suspense boundaries', 'Error boundaries', 'Loading indicators', 'Retry logic']
    },
    {
      category: 'core',
      icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
      title: '150+ Built-in Functions',
      description: 'Comprehensive API with utilities for common tasks and patterns.',
      features: ['UI components', 'Lifecycle hooks', 'Style utilities', 'Form helpers']
    }
  ];

  const filteredFeatures = () => {
    if (featuresState.selectedCategory === 'all') {
      return features;
    }
    return features.filter(f => f.category === featuresState.selectedCategory);
  };

  return UI.vbox({
    style: {
      padding: '3rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      gap: '3rem'
    }
  }, [
    // Header
    UI.vbox({
      style: {
        textAlign: 'center',
        gap: '1rem'
      }
    }, [
      UI.container({
        style: {
          display: 'inline-block',
          padding: '0.5rem 1.25rem',
          background: '#0a0a0a',
          border: '1px solid #333333',
          borderRadius: '9999px',
          marginBottom: '0.5rem'
        }
      }, [
        UI.text({
          style: {
            fontSize: '0.875rem',
            color: '#00ff88',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }
        }, 'COMPREHENSIVE FEATURES')
      ]),

      UI.h1({
        style: {
          fontSize: '3rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0,
          fontFamily: '"Montserrat", sans-serif'
        }
      }, 'Everything You Need'),

      UI.text({
        style: {
          fontSize: '1.125rem',
          color: '#b0b0b0',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto'
        }
      }, 'Rynex provides a complete toolkit for building modern web applications. From reactive state to routing, we\'ve got you covered.')
    ]),

    // Category Filter
    UI.hbox({
      style: {
        gap: '0.75rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }
    }, categories.map(cat =>
      UI.button({
        onClick: () => featuresState.selectedCategory = cat.id,
        style: {
          padding: '0.625rem 1.25rem',
          background: featuresState.selectedCategory === cat.id ? '#00ff88' : '#0a0a0a',
          color: featuresState.selectedCategory === cat.id ? '#000000' : '#ffffff',
          border: `1px solid ${featuresState.selectedCategory === cat.id ? '#00ff88' : '#333333'}`,
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out'
        },
        onHover: {
          transform: 'translateY(-2px)',
          borderColor: '#00ff88'
        }
      }, cat.name)
    )),

    // Features Grid
    UI.vbox({
      style: {
        gap: '1.5rem'
      }
    }, filteredFeatures().map(feature =>
      UI.vbox({
        style: {
          padding: '2rem',
          background: '#0a0a0a',
          border: '1px solid #333333',
          borderRadius: '0.75rem',
          gap: '1.25rem',
          transition: 'all 0.3s ease-in-out'
        },
        onHover: {
          borderColor: '#00ff88',
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 255, 136, 0.15)'
        }
      }, [
        // Icon and Title
        UI.hbox({
          style: {
            gap: '1rem',
            alignItems: 'center'
          }
        }, [
          UI.svg({
            viewBox: '0 0 24 24',
            width: '48',
            height: '48',
            fill: '#00ff88',
            style: { flexShrink: 0 }
          }, feature.icon) as any,
          
          UI.h2({
            style: {
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              fontFamily: '"Montserrat", sans-serif'
            }
          }, feature.title)
        ]),

        // Description
        UI.text({
          style: {
            fontSize: '1rem',
            color: '#b0b0b0',
            lineHeight: '1.6'
          }
        }, feature.description),

        // Feature List
        UI.vbox({
          style: {
            gap: '0.5rem',
            paddingLeft: '1rem'
          }
        }, feature.features.map(item =>
          UI.hbox({
            style: {
              gap: '0.75rem',
              alignItems: 'center'
            }
          }, [
            UI.text({
              style: {
                color: '#00ff88',
                fontSize: '1.25rem',
                lineHeight: '1'
              }
            }, '✓'),
            UI.text({
              style: {
                color: '#cccccc',
                fontSize: '0.9rem'
              }
            }, item)
          ])
        ))
      ])
    )),

    // CTA Section
    UI.vbox({
      style: {
        textAlign: 'center',
        gap: '1.5rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
        border: '1px solid rgba(0, 255, 136, 0.2)',
        borderRadius: '1rem',
        marginTop: '2rem'
      }
    }, [
      UI.h2({
        style: {
          fontSize: '2rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0,
          fontFamily: '"Montserrat", sans-serif'
        }
      }, 'Ready to Build?'),

      UI.text({
        style: {
          fontSize: '1.125rem',
          color: '#b0b0b0',
          lineHeight: '1.6'
        }
      }, 'Start building your next project with Rynex today.'),

      UI.hbox({
        style: {
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '0.5rem'
        }
      }, [
        UI.button({
          onClick: () => window.open('https://github.com/razen-core/rynex', '_blank'),
          style: {
            padding: '0.875rem 2rem',
            background: '#00ff88',
            color: '#000000',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
          },
          onHover: {
            transform: 'translateY(-2px)',
            background: '#00cc6a'
          }
        }, 'View Documentation'),

        Link({
          to: '/contact',
          style: {
            textDecoration: 'none'
          }
        }, UI.button({
          style: {
            padding: '0.875rem 2rem',
            background: '#0a0a0a',
            color: '#ffffff',
            border: '1px solid #333333',
            borderRadius: '9999px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
          },
          onHover: {
            transform: 'translateY(-2px)',
            borderColor: '#00ff88'
          }
        }, 'Get in Touch'))
      ])
    ])
  ]);
}
