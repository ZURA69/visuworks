const API_URL = process.env.REACT_APP_BACKEND_URL;

export const ContactService = {
  async submit(formData) {
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          service: formData.service || '',
          message: formData.message,
          website: formData.website || '', // honeypot field
        }),
      });

      if (response.status === 429) {
        return {
          success: false,
          message: 'Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut.',
        };
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Server error');
      }

      const data = await response.json();
      return {
        success: data.status === 'success',
        message: data.message || 'Anfrage erfolgreich gesendet',
      };
    } catch (error) {
      console.error('[ContactService] Error:', error);
      return {
        success: false,
        message: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
      };
    }
  },

  validate(formData) {
    const errors = {};

    if (!formData.name?.trim()) {
      errors.name = 'Name ist erforderlich';
    }

    if (!formData.email?.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Bitte geben Sie eine gültige E-Mail ein';
    }

    if (!formData.message?.trim()) {
      errors.message = 'Nachricht ist erforderlich';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export default ContactService;
