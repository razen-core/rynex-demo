import * as UI from 'rynex';
import { state, Link } from 'rynex';

interface FormData {
  name: string;
  email: string;
  type: 'developer' | 'sponsor';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormState {
  name: string;
  email: string;
  type: 'developer' | 'sponsor';
  message: string;
  errors: FormErrors;
  submitting: boolean;
  success: boolean;
  submitCount: number;
}

export default function ContactPage() {
  const formState = state<ContactFormState>({
    name: '',
    email: '',
    type: 'developer',
    message: '',
    errors: {},
    submitting: false,
    success: false,
    submitCount: 0
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    
    const sanitizedName = sanitizeInput(formState.name);
    if (!sanitizedName) {
      errors.name = 'Name is required';
    } else if (sanitizedName.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (sanitizedName.length > 50) {
      errors.name = 'Name must be less than 50 characters';
    }
    
    const sanitizedEmail = sanitizeInput(formState.email);
    if (!sanitizedEmail) {
      errors.email = 'Email is required';
    } else if (!validateEmail(sanitizedEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    
    const sanitizedMessage = sanitizeInput(formState.message);
    if (!sanitizedMessage) {
      errors.message = 'Message is required';
    } else if (sanitizedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (sanitizedMessage.length > 1000) {
      errors.message = 'Message must be less than 1000 characters';
    }
    
    formState.errors = errors;
    return Object.keys(errors).length === 0;
  };

  const resetForm = (): void => {
    formState.name = '';
    formState.email = '';
    formState.type = 'developer';
    formState.message = '';
    formState.success = false;
    formState.errors = {};
  };

  const handleSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();
    
    if (!validate()) {
      console.warn('Form validation failed');
      return;
    }
    
    formState.submitting = true;
    formState.submitCount++;
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Prepare form data
      const formData: FormData = {
        name: sanitizeInput(formState.name),
        email: sanitizeInput(formState.email),
        type: formState.type,
        message: sanitizeInput(formState.message)
      };
      
      // Log submission (in production, this would be an API call)
      console.log('Form submitted:', formData);
      console.log('Submission count:', formState.submitCount);
      
      formState.success = true;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      formState.errors = { message: 'Failed to submit form. Please try again.' };
    } finally {
      formState.submitting = false;
    }
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
        }, 'GET IN TOUCH')
      ]),

      UI.h1({
        style: {
          fontSize: '3rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0,
          fontFamily: '"Montserrat", sans-serif'
        }
      }, 'Contact Us'),

      UI.text({
        style: {
          fontSize: '1.125rem',
          color: '#b0b0b0',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto'
        }
      }, 'Whether you\'re a developer interested in Rynex or a potential sponsor, we\'d love to hear from you.')
    ]),

    // Main Content Grid
    UI.hbox({
      style: {
        gap: '2rem',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }
    }, [
      // Contact Form
      UI.vbox({
        style: {
          flex: '1',
          minWidth: '300px',
          padding: '2rem',
          background: '#0a0a0a',
          border: '1px solid #333333',
          borderRadius: '0.75rem',
          gap: '1.5rem'
        }
      }, [
        UI.h2({
          style: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            margin: 0,
            fontFamily: '"Montserrat", sans-serif'
          }
        }, 'Send us a Message'),

        // Success Message
        UI.show(() => formState.success,
          UI.vbox({
            style: {
              padding: '1rem',
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: '0.5rem',
              gap: '0.5rem'
            }
          }, [
            UI.text({
              style: {
                color: '#00ff88',
                fontWeight: '600',
                fontSize: '1rem'
              }
            }, '✓ Message Sent Successfully!'),
            UI.text({
              style: {
                color: '#b0b0b0',
                fontSize: '0.875rem'
              }
            }, 'We\'ll get back to you as soon as possible.')
          ])
        ),

        // Form
        UI.form({
          onSubmit: handleSubmit,
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }
        }, [
          // Name Field
          UI.vbox({
            style: { gap: '0.5rem' }
          }, [
            UI.label({
              style: {
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: '600'
              }
            }, 'Name *'),
            UI.input({
              value: formState.name,
              onInput: (e) => {
                formState.name = (e.target as HTMLInputElement).value;
                if (formState.errors.name) delete formState.errors.name;
              },
              placeholder: 'Your name',
              style: {
                padding: '0.75rem',
                background: '#000000',
                border: `1px solid ${formState.errors.name ? '#ff4444' : '#333333'}`,
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }
            }),
            UI.show(() => !!formState.errors.name,
              UI.text({
                style: {
                  color: '#ff4444',
                  fontSize: '0.75rem'
                }
              }, () => formState.errors.name || '')
            )
          ]),

          // Email Field
          UI.vbox({
            style: { gap: '0.5rem' }
          }, [
            UI.label({
              style: {
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: '600'
              }
            }, 'Email *'),
            UI.input({
              type: 'email',
              value: formState.email,
              onInput: (e) => {
                formState.email = (e.target as HTMLInputElement).value;
                if (formState.errors.email) delete formState.errors.email;
              },
              placeholder: 'your.email@example.com',
              style: {
                padding: '0.75rem',
                background: '#000000',
                border: `1px solid ${formState.errors.email ? '#ff4444' : '#333333'}`,
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }
            }),
            UI.show(() => !!formState.errors.email,
              UI.text({
                style: {
                  color: '#ff4444',
                  fontSize: '0.75rem'
                }
              }, () => formState.errors.email || '')
            )
          ]),

          // Type Selection
          UI.vbox({
            style: { gap: '0.5rem' }
          }, [
            UI.label({
              style: {
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: '600'
              }
            }, 'I am a *'),
            UI.hbox({
              style: { gap: '1rem' }
            }, [
              UI.label({
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#b0b0b0',
                  cursor: 'pointer'
                }
              }, [
                UI.input({
                  type: 'radio',
                  name: 'type',
                  value: 'developer',
                  checked: formState.type === 'developer',
                  onChange: () => formState.type = 'developer',
                  style: {
                    cursor: 'pointer',
                    accentColor: '#00ff88'
                  }
                }),
                UI.text({}, 'Developer')
              ]),
              UI.label({
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#b0b0b0',
                  cursor: 'pointer'
                }
              }, [
                UI.input({
                  type: 'radio',
                  name: 'type',
                  value: 'sponsor',
                  checked: formState.type === 'sponsor',
                  onChange: () => formState.type = 'sponsor',
                  style: {
                    cursor: 'pointer',
                    accentColor: '#00ff88'
                  }
                }),
                UI.text({}, 'Sponsor')
              ])
            ])
          ]),

          // Message Field
          UI.vbox({
            style: { gap: '0.5rem' }
          }, [
            UI.label({
              style: {
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: '600'
              }
            }, 'Message *'),
            UI.textarea({
              value: formState.message,
              onInput: (e) => {
                formState.message = (e.target as HTMLTextAreaElement).value;
                if (formState.errors.message) delete formState.errors.message;
              },
              placeholder: 'Tell us about your project or sponsorship interest...',
              style: {
                padding: '0.75rem',
                background: '#000000',
                border: `1px solid ${formState.errors.message ? '#ff4444' : '#333333'}`,
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                minHeight: '150px',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }
            }),
            UI.show(() => !!formState.errors.message,
              UI.text({
                style: {
                  color: '#ff4444',
                  fontSize: '0.75rem'
                }
              }, () => formState.errors.message || '')
            )
          ]),

          // Submit Button
          UI.button({
            type: 'submit',
            disabled: formState.submitting,
            style: {
              padding: '0.875rem 2rem',
              background: formState.submitting ? '#666666' : '#00ff88',
              color: '#000000',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: formState.submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease-in-out',
              opacity: formState.submitting ? 0.6 : 1
            }
          }, () => formState.submitting ? 'Sending...' : 'Send Message')
        ])
      ]),

      // Info Cards
      UI.vbox({
        style: {
          flex: '1',
          minWidth: '300px',
          gap: '1.5rem'
        }
      }, [
        // For Developers
        UI.vbox({
          style: {
            padding: '2rem',
            background: '#0a0a0a',
            border: '1px solid #333333',
            borderRadius: '0.75rem',
            gap: '1rem'
          }
        }, [
          UI.svg({
            viewBox: '0 0 24 24',
            width: '48',
            height: '48',
            fill: '#00ff88',
            style: { display: 'block' }
          }, '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>') as any,
          
          UI.h3({
            style: {
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              fontFamily: '"Montserrat", sans-serif'
            }
          }, 'For Developers'),

          UI.text({
            style: {
              color: '#b0b0b0',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }
          }, 'Interested in contributing to Rynex or building with it? We\'d love to hear your ideas, feedback, and questions.'),

          UI.vbox({
            style: {
              gap: '0.5rem',
              marginTop: '0.5rem'
            }
          }, [
            UI.hbox({
              style: {
                gap: '0.5rem',
                alignItems: 'center'
              }
            }, [
              UI.text({
                style: { color: '#00ff88', fontSize: '1.25rem' }
              }, '✓'),
              UI.text({
                style: { color: '#cccccc', fontSize: '0.875rem' }
              }, 'Technical support')
            ]),
            UI.hbox({
              style: {
                gap: '0.5rem',
                alignItems: 'center'
              }
            }, [
              UI.text({
                style: { color: '#00ff88', fontSize: '1.25rem' }
              }, '✓'),
              UI.text({
                style: { color: '#cccccc', fontSize: '0.875rem' }
              }, 'Feature requests')
            ]),
            UI.hbox({
              style: {
                gap: '0.5rem',
                alignItems: 'center'
              }
            }, [
              UI.text({
                style: { color: '#00ff88', fontSize: '1.25rem' }
              }, '✓'),
              UI.text({
                style: { color: '#cccccc', fontSize: '0.875rem' }
              }, 'Contribution guidelines')
            ])
          ])
        ]),

        // For Sponsors
        UI.vbox({
          style: {
            padding: '2rem',
            background: '#0a0a0a',
            border: '1px solid #333333',
            borderRadius: '0.75rem',
            gap: '1rem'
          }
        }, [
          UI.svg({
            viewBox: '0 0 24 24',
            width: '48',
            height: '48',
            fill: '#00ff88',
            style: { display: 'block' }
          }, '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>') as any,
          
          UI.h3({
            style: {
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              fontFamily: '"Montserrat", sans-serif'
            }
          }, 'For Sponsors'),

          UI.text({
            style: {
              color: '#b0b0b0',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }
          }, 'Support Rynex development and get your brand in front of thousands of developers. Let\'s discuss partnership opportunities.'),

          UI.vbox({
            style: {
              gap: '0.5rem',
              marginTop: '0.5rem'
            }
          }, [
            UI.hbox({
              style: {
                gap: '0.5rem',
                alignItems: 'center'
              }
            }, [
              UI.text({
                style: { color: '#00ff88', fontSize: '1.25rem' }
              }, '✓'),
              UI.text({
                style: { color: '#cccccc', fontSize: '0.875rem' }
              }, 'Brand visibility')
            ]),
            UI.hbox({
              style: {
                gap: '0.5rem',
                alignItems: 'center'
              }
            }, [
              UI.text({
                style: { color: '#00ff88', fontSize: '1.25rem' }
              }, '✓'),
              UI.text({
                style: { color: '#cccccc', fontSize: '0.875rem' }
              }, 'Community engagement')
            ]),
            UI.hbox({
              style: {
                gap: '0.5rem',
                alignItems: 'center'
              }
            }, [
              UI.text({
                style: { color: '#00ff88', fontSize: '1.25rem' }
              }, '✓'),
              UI.text({
                style: { color: '#cccccc', fontSize: '0.875rem' }
              }, 'Custom packages')
            ])
          ])
        ]),

        // Quick Links
        UI.vbox({
          style: {
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            borderRadius: '0.75rem',
            gap: '1rem'
          }
        }, [
          UI.h3({
            style: {
              fontSize: '1.125rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              fontFamily: '"Montserrat", sans-serif'
            }
          }, 'Quick Links'),

          UI.vbox({
            style: { gap: '0.75rem' }
          }, [
            UI.button({
              onClick: () => window.open('https://github.com/razen-core/rynex', '_blank'),
              style: {
                padding: '0.75rem 1.5rem',
                background: '#0a0a0a',
                color: '#00ff88',
                border: '1px solid #333333',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease-in-out',
                width: '100%'
              },
              onHover: {
                borderColor: '#00ff88',
                transform: 'translateX(4px)'
              }
            }, '→ GitHub Repository'),

            UI.button({
              onClick: () => window.open('https://www.npmjs.com/package/rynex', '_blank'),
              style: {
                padding: '0.75rem 1.5rem',
                background: '#0a0a0a',
                color: '#00ff88',
                border: '1px solid #333333',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease-in-out',
                width: '100%'
              },
              onHover: {
                borderColor: '#00ff88',
                transform: 'translateX(4px)'
              }
            }, '→ NPM Package'),

            Link({
              to: '/features',
              style: {
                textDecoration: 'none',
                width: '100%'
              }
            }, UI.button({
              style: {
                padding: '0.75rem 1.5rem',
                background: '#0a0a0a',
                color: '#00ff88',
                border: '1px solid #333333',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease-in-out',
                width: '100%'
              },
              onHover: {
                borderColor: '#00ff88',
                transform: 'translateX(4px)'
              }
            }, '→ View Features'))
          ])
        ])
      ])
    ])
  ]);
}
