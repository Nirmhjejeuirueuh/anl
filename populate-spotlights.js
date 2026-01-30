const fetch = require('node-fetch').default;

const strapiUrl = 'http://localhost:1337/api/spotlights';
// Remove the API token for now
// const apiToken = '...';

const spotlights = [
  {
    data: {
      tag: "Featured",
      date: "2026-01-30",
      title: "Agile Transformation Success",
      subtitle: "How AgileN Lite Helped Transform Enterprise Operations",
      description: "Discover how our comprehensive Agile training programs have helped leading enterprises achieve digital transformation and improve operational efficiency by 300%.",
      buttonText: "Read Case Study",
      buttonLink: "/case-studies/agile-transformation",
      order: 1
    }
  },
  {
    data: {
      tag: "Trending",
      date: "2026-01-28",
      title: "Cybersecurity Excellence",
      subtitle: "Advanced Threat Detection & Response Training",
      description: "Our cutting-edge cybersecurity courses equip professionals with the latest skills to combat evolving cyber threats and protect critical business assets.",
      buttonText: "Explore Courses",
      buttonLink: "/courses?category=cybersecurity",
      order: 2
    }
  },
  {
    data: {
      tag: "New",
      date: "2026-01-25",
      title: "Cloud Migration Mastery",
      subtitle: "Complete Guide to Cloud Adoption & Migration",
      description: "Learn the essential strategies and best practices for successful cloud migration, from planning to execution and optimization.",
      buttonText: "Start Learning",
      buttonLink: "/courses?category=cloud-computing",
      order: 3
    }
  }
];

async function postSpotlights() {
  for (const spotlight of spotlights) {
    try {
      const response = await fetch(strapiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotlight)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Posted spotlight: ${spotlight.data.title}`);
        console.log(`   ID: ${result.data.documentId}`);
      } else {
        console.error(`❌ Error posting ${spotlight.data.title}:`, await response.text());
      }
    } catch (error) {
      console.error(`❌ Error posting ${spotlight.data.title}:`, error.message);
    }

    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

postSpotlights().catch(console.error);