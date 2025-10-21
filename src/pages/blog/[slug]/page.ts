import * as UI from 'rynex';
import { RouteContext, Link } from 'rynex';

export default function BlogPostPage(ctx: RouteContext) {
  const slug = ctx.params.slug || 'unknown';
  
  // Mock blog post data
  const posts: Record<string, any> = {
    'getting-started': {
      title: 'Getting Started with Rynex',
      date: '2024-10-21',
      category: 'Tutorial',
      content: 'Learn how to build your first Rynex application from scratch. This comprehensive guide will walk you through setting up your development environment, creating your first component, and understanding the reactive state system. Rynex makes it easy to build modern web applications with minimal boilerplate and maximum performance.'
    },
    'reactive-state': {
      title: 'Understanding Reactive State',
      date: '2024-10-20',
      category: 'Guide',
      content: 'Deep dive into Rynex reactive state management. Learn how Proxy-based reactivity works under the hood and how it compares to other popular frameworks like React and Vue. The reactive system in Rynex automatically tracks dependencies and updates the UI efficiently without the overhead of a virtual DOM.'
    },
    'routing-guide': {
      title: 'File-Based Routing Explained',
      date: '2024-10-19',
      category: 'Tutorial',
      content: 'Master file-based routing in Rynex. Learn about dynamic routes, lazy loading, navigation guards, and how to build complex multi-page applications. This demo project itself uses all these routing features to provide a seamless navigation experience.'
    },
    'performance-tips': {
      title: 'Performance Optimization',
      date: '2024-10-18',
      category: 'Performance',
      content: 'Best practices for building high-performance applications with Rynex. Learn about memoization, lazy loading, code splitting, and other optimization techniques. Rynex is designed to be fast by default, with no virtual DOM overhead and direct DOM manipulation for maximum performance.'
    },
    'for-sponsors': {
      title: 'Why Sponsor Rynex?',
      date: '2024-10-17',
      category: 'Sponsorship',
      content: 'Discover the benefits of sponsoring Rynex and how your support helps build the future of web development. As a sponsor, you\'ll gain visibility among thousands of developers, contribute to open-source innovation, and help shape a framework that prioritizes performance and developer experience. Your sponsorship directly supports ongoing development, documentation, community building, and ecosystem growth.'
    }
  };

  const post = posts[slug] || {
    title: 'Post Not Found',
    date: '2024-10-21',
    category: 'Unknown',
    content: `The blog post "${slug}" could not be found.`
  };
  
  return UI.vbox({
    style: { 
      padding: '3rem 2rem',
      maxWidth: '900px',
      margin: '0 auto',
      gap: '2rem'
    }
  }, [
    // Breadcrumb
    UI.hbox({
      style: {
        gap: '0.5rem',
        alignItems: 'center',
        color: '#666666',
        fontSize: '0.875rem'
      }
    }, [
      UI.text({ style: { color: '#666666', cursor: 'pointer' }, onClick: () => window.history.back() }, 'Blog'),
      UI.text({}, '›'),
      UI.text({ style: { color: '#00ff88' } }, post.title)
    ]),
    
    // Header
    UI.vbox({
      style: {
        gap: '1rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid #333333'
      }
    }, [
      // Category badge
      UI.container({
        style: {
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '9999px',
          width: 'fit-content'
        }
      }, [
        UI.text({
          style: {
            fontSize: '0.75rem',
            color: '#00ff88',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }
        }, post.category.toUpperCase())
      ]),

      UI.h1({
        style: {
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0,
          fontFamily: '"Montserrat", sans-serif',
          lineHeight: '1.2'
        }
      }, post.title),
      
      UI.text({
        style: { 
          color: '#666666',
          fontSize: '0.875rem'
        }
      }, `Published on ${post.date}`)
    ]),
    
    // Content
    UI.vbox({
      style: { 
        gap: '1.5rem',
        paddingTop: '1rem'
      }
    }, [
      UI.p({
        style: {
          fontSize: '1.125rem',
          color: '#b0b0b0',
          lineHeight: '1.8',
          margin: 0
        }
      }, post.content),
      
      UI.p({
        style: {
          fontSize: '1rem',
          color: '#b0b0b0',
          lineHeight: '1.8',
          margin: 0
        }
      }, 'This comprehensive guide covers everything you need to know about building modern web applications with Rynex. From basic concepts to advanced patterns, you\'ll learn how to leverage the framework\'s reactive state management and routing capabilities to create performant, maintainable applications.'),
      
      UI.p({
        style: {
          fontSize: '1rem',
          color: '#b0b0b0',
          lineHeight: '1.8',
          margin: 0
        }
      }, 'Whether you\'re a seasoned developer or just getting started with Rynex, this article provides practical examples and best practices that you can apply immediately to your projects. The framework\'s intuitive API and TypeScript-first approach make it easy to build complex UIs without the overhead of a virtual DOM.')
    ]),
    
    // Actions
    UI.hbox({
      style: { 
        gap: '1rem',
        marginTop: '2rem',
        paddingTop: '2rem',
        borderTop: '1px solid #333333'
      }
    }, [
      Link({
        to: '/blog',
        style: {
          textDecoration: 'none'
        }
      }, UI.button({
        style: {
          padding: '0.75rem 1.5rem',
          background: '#0a0a0a',
          color: '#ffffff',
          border: '1px solid #333333',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'all 0.2s'
        },
        onHover: {
          borderColor: '#00ff88',
          transform: 'translateY(-2px)'
        }
      }, '← Back to Blog')),
      
      Link({
        to: '/',
        style: {
          textDecoration: 'none'
        }
      }, UI.button({
        style: {
          padding: '0.75rem 1.5rem',
          background: '#00ff88',
          color: '#000000',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          transition: 'all 0.2s'
        },
        onHover: {
          background: '#00cc6a',
          transform: 'translateY(-2px)'
        }
      }, 'Home'))
    ])
  ]);
}
