const fetch = require('node-fetch').default;

const strapiUrl = 'http://localhost:1337/api/news-items';
// Remove the API token for now
// const apiToken = '...';

const news = [
  {
    data: {
      title: "Singapore considers cybersecurity requirements for vendors with access to sensitive government data",
      description: "Such vendors might need to meet certain standards before being licensed or allowed to bid for government contracts",
      source: "The Business Times",
      date: "May 7, 2025",
      tag: "Cybersecurity",
      url: "#"
    }
  },
  {
    data: {
      title: "Law passed allowing public sector data to be shared with trusted external partners",
      description: "Under the amended Act, agencies are allowed to share data with external partners only when three safeguards are met.",
      source: "CNA",
      date: "Jan 12, 2026",
      tag: "Singapore",
      url: "#"
    }
  },
  {
    data: {
      title: "CISOaaS (Cyber Essentials) for HIB entities",
      description: "Get your organization ready with comprehensive cybersecurity solutions tailored for Health Information Banks.",
      source: "Cyber Security Agency of Singapore (CSA)",
      date: "Coming Soon",
      tag: "Services",
      url: "#"
    }
  }
];

async function postNews() {
  for (const newsItem of news) {
    try {
      const response = await fetch(strapiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsItem)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Posted news: ${newsItem.data.title}`);
        console.log(`   ID: ${result.data.documentId}`);
      } else {
        console.error(`❌ Error posting ${newsItem.data.title}:`, await response.text());
      }
    } catch (error) {
      console.error(`❌ Error posting ${newsItem.data.title}:`, error.message);
    }

    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

postNews().catch(console.error);