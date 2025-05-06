/**
 * Gmail Signature Generator
 * 
 * A utility to create and format email signatures for Gmail
 */

// Default example HTML for the signature editor
export const DEFAULT_HTML = `<!-- Gmail Signature Template -->
<table style="max-width:600px; width:100%; border-collapse:collapse; font-family:Arial, sans-serif; color:#ffffff;" cellpadding="0" cellspacing="0" border="0">
  <!-- Header with Name, Title and Logo -->
  <tr>
    <td style="background-color:#000000; padding:20px;">
      <!-- Profile Photo and Name Section -->
      <table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="width:80px; vertical-align:middle;">
            <img src="https://i.imgur.com/JSKQCrM.png" alt="Profile Photo" style="display:block; width:80px; height:80px; border-radius:40px; border:none; object-fit:cover; -ms-interpolation-mode:bicubic;">
          </td>
          <td style="padding-left:15px; vertical-align:middle;">
            <div style="font-size:20px; font-weight:bold;">Phillipp Ruckert</div>
            <div style="font-size:14px; color:#cccccc;">Chairman of The Board</div>
          </td>
          <td style="text-align:right; vertical-align:middle;">
            <img src="https://i.imgur.com/3WY94Zj.png" alt="Company Logo" style="display:block; max-width:100px; width:auto; height:auto; max-height:40px; border:none; -ms-interpolation-mode:bicubic;">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <!-- Contact Information -->
  <tr>
    <td style="background-color:#1a1a1a; padding:20px;">
      <!-- Contact Section -->
      <table style="width:100%; color:#cccccc; font-size:12px;" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Contact</div>
            <div>Phillipp Ruckert</div>
            <div>+49 170 90 80 510</div>
            <div><a href="mailto:hello@peak-atlas.io" style="color:#cccccc; text-decoration:none;">hello@peak-atlas.io</a></div>
          </td>
        </tr>
        
        <!-- Company Information -->
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Company</div>
            <div>Peak Atlas Group AG (Aktiengesellschaft)</div>
            <div>Eichhornstraße 5, 97070 Würzburg, Germany</div>
            <div><a href="https://peak-atlas.io" style="color:#cccccc; text-decoration:none;">peak-atlas.io</a> • <a href="mailto:hello@peak-atlas.io" style="color:#cccccc; text-decoration:none;">hello@peak-atlas.io</a> • District Court of Würzburg HRB 17861</div>
          </td>
        </tr>
        
        <!-- Governance Information -->
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Governance</div>
            <div>Supervisory Board: RA Berthold Yahya • Julian J. Schrader, M.Sc. • Tanja Scheuering, B.Sc.</div>
            <div>Advisory Board: Axel Scheuering • Daniel Unger • Volker Walther • Axel Goldau • Kurt Groh • Luke Greenwood</div>
            <div>Auditor: Harald Albert Belzer</div>
          </td>
        </tr>
        
        <!-- Corporate Group Information -->
        <tr>
          <td style="padding-bottom:15px;">
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Corporate Group</div>
            <div>Peak Atlas Group AG is the parent of a corporate group ("Konzern") comprising:</div>
            <div>Management Company – Peak Atlas HQ GmbH, District Court of Würzburg, HRB 17790 Intermediate</div>
            <div>Holding Company – Peak Atlas UG, District Court of Würzburg, HRB 17694</div>
            <div>Project Company – Peak Atlas Office UG, District Court of Würzburg, HRB 17806</div>
          </td>
        </tr>
        
        <!-- Disclaimer -->
        <tr>
          <td>
            <div style="font-weight:bold; color:#ffffff; margin-bottom:5px;">Disclaimer</div>
            <div>This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you are not the intended recipient, please notify the sender immediately and delete this email from your system. Any unauthorized use, disclosure, or distribution is prohibited.</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

// Interface for cleanup options
export interface CleanupOptions {
  removeComments: boolean;
  inlineCss: boolean;
  removeScripts: boolean;
  fixTables: boolean;
}

// Default options
export const DEFAULT_OPTIONS: CleanupOptions = {
  removeComments: true,
  inlineCss: true,
  removeScripts: true,
  fixTables: true
};

// Signature data interface
export interface SignatureData {
  name: string;
  title: string;
  company: string;
  profileImageUrl: string;
  companyLogoUrl: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  companyRegistration: string;
}

// Default signature data
export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  name: "Phillipp Ruckert",
  title: "Chairman of The Board",
  company: "Peak Atlas Group AG (Aktiengesellschaft)",
  profileImageUrl: "https://i.imgur.com/JSKQCrM.png",
  companyLogoUrl: "https://i.imgur.com/3WY94Zj.png",
  phone: "+49 170 90 80 510",
  email: "hello@peak-atlas.io",
  website: "peak-atlas.io",
  address: "Eichhornstraße 5, 97070 Würzburg, Germany",
  companyRegistration: "District Court of Würzburg HRB 17861"
};

/**
 * Transform HTML to make it Gmail compatible
 */
export function transformHtml(
  html: string,
  options: CleanupOptions = DEFAULT_OPTIONS
): string {
  let transformedHtml = html;

  try {
    // Remove HTML comments if option is selected
    if (options.removeComments) {
      transformedHtml = transformedHtml.replace(/<!--[\s\S]*?-->/g, '');
    }

    // Remove script tags if option is selected
    if (options.removeScripts) {
      transformedHtml = transformedHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
    }

    // Fix tables for Gmail if option is selected
    if (options.fixTables) {
      // Make sure all tables have cellpadding and cellspacing attributes
      transformedHtml = transformedHtml.replace(
        /<table(?![^>]*cellpadding)[^>]*>/gi,
        (match) => match.replace(/<table/i, '<table cellpadding="0"')
      );
      
      transformedHtml = transformedHtml.replace(
        /<table(?![^>]*cellspacing)[^>]*>/gi,
        (match) => match.replace(/<table/i, '<table cellspacing="0"')
      );

      // Make sure tables have border="0" if not specified
      transformedHtml = transformedHtml.replace(
        /<table(?![^>]*border)[^>]*>/gi,
        (match) => match.replace(/<table/i, '<table border="0"')
      );

      // Add responsive attributes to tables
      transformedHtml = transformedHtml.replace(
        /<table[^>]*>/gi,
        (match) => {
          // If the table already has a width, make it max-width
          if (match.includes('width:')) {
            match = match.replace(/width:([^;]*);/gi, 'max-width:$1; width:100%;');
          }
          // Make sure images are displayed correctly
          if (!match.includes('style=')) {
            return match.replace(/<table/i, '<table style="width:100%; max-width:600px;"');
          }
          return match;
        }
      );

      // Improve image rendering for high quality
      transformedHtml = transformedHtml.replace(
        /<img([^>]*)>/gi,
        (match, attributes) => {
          // Check if the img tag has style attribute
          if (!match.includes('style=')) {
            return `<img${attributes} style="display:block; max-width:100%; border:none; image-rendering:high-quality; -ms-interpolation-mode:bicubic;">`;
          } else {
            // Add image quality attributes if they don't exist
            let newMatch = match;
            if (!match.includes('image-rendering')) {
              newMatch = newMatch.replace(/style="([^"]*)"/i, 'style="$1; image-rendering:high-quality;"');
            }
            if (!match.includes('-ms-interpolation-mode')) {
              newMatch = newMatch.replace(/style="([^"]*)"/i, 'style="$1; -ms-interpolation-mode:bicubic;"');
            }
            return newMatch;
          }
        }
      );

      // Ensure profile image maintains proper aspect ratio and quality
      transformedHtml = transformedHtml.replace(
        /<img([^>]*alt="Profile Photo"[^>]*)>/gi, 
        (match, attributes) => {
          if (!match.includes('object-fit')) {
            return match.replace(/style="([^"]*)"/i, 'style="$1; object-fit:cover;"');
          }
          return match;
        }
      );

      // Ensure company logo maintains proper size and spacing
      transformedHtml = transformedHtml.replace(
        /<img([^>]*alt="Company Logo"[^>]*)>/gi, 
        (match, attributes) => {
          if (!match.includes('margin-left')) {
            return match.replace(/style="([^"]*)"/i, 'style="$1; margin-left:auto;"');
          }
          return match;
        }
      );
    }

    return transformedHtml;
  } catch (error) {
    console.error("Error transforming HTML:", error);
    return html; // Return original on error
  }
}

/**
 * Check if HTML has obvious syntax errors
 */
export function validateHtml(html: string): { valid: boolean; error?: string } {
  try {
    // Very basic validation - real implementation would use a proper HTML parser
    const openTags = html.match(/<[^/][^>]*>/g) || [];
    const closeTags = html.match(/<\/[^>]*>/g) || [];
    
    // Check for basic unclosed tags
    if (openTags.length < closeTags.length) {
      return {
        valid: false,
        error: "There seems to be too many closing HTML tags"
      };
    }

    // Check for specific invalid patterns
    if (html.includes('<html') && !html.includes('</html>')) {
      return {
        valid: false,
        error: "Missing closing </html> tag"
      };
    }

    if (html.includes('<body') && !html.includes('</body>')) {
      return {
        valid: false,
        error: "Missing closing </body> tag"
      };
    }

    if (html.includes('<table') && !html.includes('</table>')) {
      return {
        valid: false,
        error: "Missing closing </table> tag"
      };
    }

    // Check for unclosed brackets
    const unclosedBracket = html.indexOf('<') > html.lastIndexOf('>');
    if (unclosedBracket) {
      return {
        valid: false,
        error: "Unclosed HTML tag or bracket"
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `HTML validation error: ${(error as Error).message}`
    };
  }
}
