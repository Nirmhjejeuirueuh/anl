import slug_maker from "slugify";
import { Marked } from "marked";

// slugify
export const slugifyyy = (content: string) => {
  if (!content) return "";

  return slug_maker(content, { lower: true });
};

// pluralize
export const pluralize = (count: number, singular: string, plural: string = singular + 's') => {
  return count === 1 ? singular : plural;
};

// markdownify
export const markdownify = (content: string, container?: boolean) => {
  if (!content) return "";

  // Pre-process content to handle custom button syntax first
  let processedContent = content;

  // Convert [text](url){.button .center} to centered red button
  processedContent = processedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)\{\.button\s+\.center\}/g,
    '<div class="text-center my-6"><a href="$2" class="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md" style="color: white;">$1</a></div>'
  );

  // Convert [text](url){.button} to regular red button
  processedContent = processedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)\{\.button\}/g,
    '<a href="$2" class="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md" style="color: white;">$1</a>'
  );

  // Create a new Marked instance with custom renderer for marked v16+
  const marked = new Marked({
    breaks: true,
    gfm: true,
  });

  // Use the new marked v16 API for custom renderers
  marked.use({
    renderer: {
      // Override the link renderer to handle both text and image links
      link(token: any) {
        const isExternal = token.href.startsWith("http");
        const targetAttrs = token.href.includes("getastrothemes")
          ? `target="_blank" rel="noopener"`
          : isExternal
            ? `target="_blank" rel="noopener noreferrer nofollow"`
            : "";

        const titleAttr = token.title ? ` title="${token.title}"` : '';

        // Check if the link contains an image token
        let linkContent = token.text;
        if (token.tokens && token.tokens.length > 0) {
          // If there are child tokens, render them (this handles images inside links)
          linkContent = this.parser.parseInline(token.tokens);
        }

        return `<a href="${token.href}" ${targetAttrs}${titleAttr}>${linkContent}</a>`;
      },

      // Override image renderer to ensure proper styling
      image(token: any) {
        const titleAttr = token.title ? ` title="${token.title}"` : '';
        const alt = token.text || '';
        return `<img src="${token.href}" alt="${alt}"${titleAttr} class="rounded-lg shadow-md max-w-full h-auto" loading="lazy" />`;
      }
    }
  });

  // Pre-process content to handle markdown inside <details> tags
  // Find all <details> blocks and process markdown inside them
  const detailsRegex = /<details>([\s\S]*?)<\/details>/g;
  processedContent = processedContent.replace(detailsRegex, (match, innerContent) => {
    // Extract summary if present
    const summaryMatch = innerContent.match(/<summary>(.*?)<\/summary>/);
    const summary = summaryMatch ? summaryMatch[1] : '';
    const contentAfterSummary = summaryMatch
      ? innerContent.replace(/<summary>.*?<\/summary>/, '')
      : innerContent;

    // Process the markdown content inside details
    const processedInner = marked.parse(contentAfterSummary.trim());

    // Reconstruct the details block with processed content
    return summary
      ? `<details><summary>${summary}</summary>\n${processedInner}</details>`
      : `<details>${processedInner}</details>`;
  });

  return container ? marked.parse(processedContent) : marked.parseInline(processedContent);
};

// humanize
export const humanize = (content: string) => {
  if (content)
    return content
      .replace(/^[\s_]+|[\s_]+$/g, "")
      .replace(/[_\s]+/g, " ")
      .replace(/[-\s]+/g, " ")
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
};

// Function for converting string to capitalized words
export const titleify = (content: string) => {
  if (!content) {
    console.warn("No content provided to titleify " + content);
    return "";
  }

  const humanized = humanize(content) || "";
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const markedInstance = new Marked();
  const parseMarkdown: any = markedInstance.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};

// Convert to Uppercase
export const toUpperCase = (content: string) => {
  if (!content) {
    console.warn("No content provided to toUppercase " + content);
    return "";
  }
  return content.toUpperCase();
};

// Convert to Lowercase
export const toLowerCase = (content: string) => {
  if (!content) {
    console.warn("No content provided to toLowercase " + content);
    return "";
  }
  return content.toLowerCase();
};

// Convert to Sentence Case
export const toSentenceCase = (content: string) => {
  if (!content) {
    console.warn("No content provided to toSentenceCase " + content);
    return "";
  }
  const lowercased = content.toLowerCase();
  return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
};

// Remove whitespace characters
export function removeWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}
