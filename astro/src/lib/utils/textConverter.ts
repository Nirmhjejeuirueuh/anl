import slug_maker from "slugify";
import { marked } from "marked";

// slugify
export const slugifyyy = (content: string) => {
  if (!content) return "";

  return slug_maker(content, { lower: true });
};

// markdownify
export const markdownify = (content: string, container?: boolean) => {
  if (!content) return "";

  const renderer = new marked.Renderer();

  // Override the link renderer
  renderer.link = (link) => {
    const isExternal = link.href.startsWith("http");
    const targetAttrs = link.href.includes("getastrothemes")
      ? `target="_blank" rel="noopener"`
      : isExternal
        ? `target="_blank" rel="noopener noreferrer nofollow"`
        : "";

    return `<a href="${link.href}" ${targetAttrs}>${link.text}</a>`;
  };

  // Pre-process content to handle markdown inside <details> tags
  let processedContent = content;

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
    marked.setOptions({
      renderer,
      breaks: true,
      gfm: true,
    });
    const processedInner = marked.parse(contentAfterSummary.trim());

    // Reconstruct the details block with processed content
    return summary
      ? `<details><summary>${summary}</summary>\n${processedInner}</details>`
      : `<details>${processedInner}</details>`;
  });

  // Set the custom renderer for the main content
  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
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
  const parseMarkdown: any = marked.parse(content);
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
