// Contact Form Service - Ready for Email Integration
// Supports: Resend, Formspree, Custom API

const CONTACT_API_ENDPOINT = process.env.REACT_APP_CONTACT_API_ENDPOINT;
const CONTACT_API_KEY = process.env.REACT_APP_CONTACT_API_KEY;

export const ContactService = {
  /**
   * Submit contact form data
   * @param {Object} formData - { name, email, phone, service, message }
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async submit(formData) {
    // If no API endpoint configured, use mock submission
    if (!CONTACT_API_ENDPOINT) {
      console.log('[ContactService] No API configured, using mock submission');
      return this.mockSubmit(formData);
    }

    // Detect service type and route accordingly
    if (CONTACT_API_ENDPOINT.includes('resend.com')) {
      return this.submitToResend(formData);
    } else if (CONTACT_API_ENDPOINT.includes('formspree.io')) {
      return this.submitToFormspree(formData);
    } else {
      return this.submitToCustomAPI(formData);
    }
  },

  /**
   * Mock submission for development/demo
   */
  async mockSubmit(formData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('[ContactService] Mock submission:', formData);
    
    return {
      success: true,
      message: 'Anfrage erfolgreich gesendet (Demo-Modus)'
    };
  },

  /**
   * Submit to Resend API
   */
  async submitToResend(formData) {
    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONTACT_API_KEY}`
        },
        body: JSON.stringify({
          from: 'noreply@visuworks.de',
          to: 'info@visuworks.de',
          subject: `Neue Anfrage: ${formData.service || 'Allgemein'} - ${formData.name}`,
          html: this.formatEmailHTML(formData)
        })
      });

      if (!response.ok) {
        throw new Error('Resend API error');
      }

      return {
        success: true,
        message: 'Anfrage erfolgreich gesendet'
      };
    } catch (error) {
      console.error('[ContactService] Resend error:', error);
      return {
        success: false,
        message: 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
      };
    }
  },

  /**
   * Submit to Formspree
   */
  async submitToFormspree(formData) {
    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          service: formData.service || '',
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Formspree error');
      }

      return {
        success: true,
        message: 'Anfrage erfolgreich gesendet'
      };
    } catch (error) {
      console.error('[ContactService] Formspree error:', error);
      return {
        success: false,
        message: 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
      };
    }
  },

  /**
   * Submit to custom API endpoint
   */
  async submitToCustomAPI(formData) {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (CONTACT_API_KEY) {
        headers['Authorization'] = `Bearer ${CONTACT_API_KEY}`;
      }

      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();
      
      return {
        success: true,
        message: data.message || 'Anfrage erfolgreich gesendet'
      };
    } catch (error) {
      console.error('[ContactService] Custom API error:', error);
      return {
        success: false,
        message: 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
      };
    }
  },

  /**
   * Format email HTML for Resend
   */
  formatEmailHTML(formData) {
    const serviceLabels = {
      'mobilitaet': 'Mobilität',
      'architektur': 'Raum & Architektur',
      'kommunikation': 'Markenkommunikation',
      'design': 'Design & Konzeption',
      'projektmanagement': 'Projektmanagement'
    };

    return `
      <h2>Neue Projektanfrage über visuworks.de</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>E-Mail:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.email}</td>
        </tr>
        ${formData.phone ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.phone}</td>
        </tr>
        ` : ''}
        ${formData.service ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Leistung:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${serviceLabels[formData.service] || formData.service}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px; vertical-align: top;"><strong>Nachricht:</strong></td>
          <td style="padding: 10px; white-space: pre-wrap;">${formData.message}</td>
        </tr>
      </table>
    `;
  },

  /**
   * Validate form data
   */
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
      errors
    };
  }
};

export default ContactService;
