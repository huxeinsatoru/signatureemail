/**
 * Gmail HTML Transformer
 * 
 * A utility to transform HTML to be compatible with Gmail's compose environment
 */

// Default example HTML for the editor
export const DEFAULT_HTML = `<!-- Example HTML - Replace with your own content -->
<table style="width:100%; border-collapse:collapse;">
  <tr>
    <td style="padding:20px; background-color:#f6f6f6; text-align:center;">
      <h1 style="color:#333333; font-family:Arial,sans-serif;">Welcome to our Newsletter</h1>
      <p style="color:#666666; font-family:Arial,sans-serif;">This is an example of HTML that could be used in Gmail.</p>
      <a href="https://example.com" style="display:inline-block; padding:10px 20px; background-color:#4285f4; color:white; text-decoration:none; border-radius:4px; font-family:Arial,sans-serif;">Learn More</a>
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
    }

    // Inline CSS would need a more complex CSS parser library 
    // in a real implementation. For this demo, we'll just preserve 
    // the inline CSS that's already there.

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
