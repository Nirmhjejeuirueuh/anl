// Simple script to populate books in Strapi CMS
// Run with: node populate-books.js
// Make sure Strapi is running on http://localhost:1337

const booksData = [
  {
    title: "The Art of Cyber Resilience: Into the Mind of Cyber Criminals Kindle Edition",
    description: "Never before has cybersecurity been more important to us. We live in the digital era where the internet, digital, online, remote, and virtual interactions have become a way of life. We cannot escape being victims of cyber attacks as we embrace the digital lifestyle and forge forward with digital transformation. Understanding and being aware of cyber threats and having good cyber hygiene is a survival life kit we need to equip ourselves. Most importantly, we have to be armed with cyber resiliency to respond to and recover from cyber incidents when they happen in our lives. This book takes you through the fundamentals of cyber attacks, highlights the warning signs of cyber incidents, and provides pointers on cultivating good hygiene and adopting good cyber resilience. The book is easy to digest, uses minimal technical jargon and incorporates several real-life cases relatable to readers.",
    author: "Amelia Ching",
    publishedDate: "March 31, 2022",
    buttonText: "Get Your Copy",
    buttonLink: "https://www.amazon.com/dp/B09X1Y4JG6"
  },
  {
    title: "Outsmart the Insider: Building A Zero-Trust Ecosystem",
    description: "Until today, there is no foolproof solution to address the cyber security risks arising from human threats. While it's easy to implement technical solutions to switch a mechanism on or off to block or remove a threat, it is not possible to totally do the same against human actions or behaviour. The majority of cyber attacks start with successful entry to the target environment or access to confidential and personal information by exploiting human weakness, also known as vulnerabilities, contributed by human factors. This eBook explains insider threats, the weakest link in an organisation's cyber security ecosystem, and outline the measures required to safeguard, combat, and recover from the related cyber risks.",
    author: "Amelia Ching",
    publishedDate: "August 5, 2024",
    buttonText: "Get Your Copy",
    buttonLink: "#"
  }
];

async function populateBooks() {
  const STRAPI_URL = 'http://localhost:1337';

  console.log('🚀 Starting to populate books in Strapi...\n');

  for (const [index, book] of booksData.entries()) {
    try {
      console.log(`📖 Creating book ${index + 1}: ${book.title.substring(0, 50)}...`);

      const response = await fetch(`${STRAPI_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: book
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log(`✅ Successfully created book: ${result.data.title}`);
      console.log(`   ID: ${result.data.id}`);
      console.log(`   Document ID: ${result.data.documentId}\n`);

    } catch (error) {
      console.error(`❌ Error creating book "${book.title.substring(0, 30)}...":`, error.message);
      console.log('');
    }
  }

  console.log('🎉 Books population complete!');
  console.log('\nNext steps:');
  console.log('1. Open Strapi admin: http://localhost:1337/admin');
  console.log('2. Go to Content Manager → Book');
  console.log('3. Publish the books (they are created as drafts)');
  console.log('4. Add cover images to each book');
  console.log('5. Visit your books page to see them live!');
}

populateBooks().catch(error => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});